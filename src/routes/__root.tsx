import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import RouteTracker from "@/components/RouteTracker";
import ScrollToTop from "@/components/ScrollToTop";
import PromoPopup from "@/components/site/PromoPopup";
import NotFoundSeo from "@/pages/NotFoundSeo";
import appCss from "@/index.css?url";

const TITLE = "Регион Логистик (Region Logistik) — авто из Китая, Японии, Кореи, Европы, США и ОАЭ под ключ";
// Заголовок, описание и og-теги задаёт каждая страница сама — здесь их нет, чтобы не было дублей.
const FAVICON = "/favicon.svg";

const ORG_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Регион Логистик",
    alternateName: ["ООО «РегионЛогистик»", "Region Logistik"],
    url: "https://rlogistik.ru/",
    logo: "https://rlogistik.ru/logo-mark.png",
    image: "https://rlogistik.ru/logo-mark.png",
    telephone: "+7-928-820-98-12",
    description: "Подбор, проверка и доставка автомобилей под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ.",
    areaServed: "RU",
    taxID: "2508143154",
    vatID: "1222500012140",
    founder: {"@type": "Person", name: "Яриз Пётр Васильевич"},
    address: {
        "@type": "PostalAddress",
        streetAddress: "Очаковское шоссе, 34, БЦ «WEST PARK», офис а605",
        addressLocality: "Москва",
        addressCountry: "RU",
    },
};

const ROTOR_SCRIPT = `(function () {
  var DEFAULT_TITLE = ${JSON.stringify(TITLE)};
  var startedAt = Date.now();
  window.YandexRotorSettings = {
    WaiterEnabled: true,
    FailOnTimeout: false,
    NoJsRedirectsToMain: true,
    IsLoaded: function () {
      var root = document.body;
      if (!root || root.children.length === 0) return false;
      var path = location.pathname;
      if (path === '/' || path === '/index.html') return true;
      if (document.title !== DEFAULT_TITLE) return true;
      return Date.now() - startedAt > 10000;
    }
  };
})();`;

const METRIKA_SCRIPT = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110764663', 'ym');
ym(110764663, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {property: "og:site_name", content: "Регион Логистик"},
            {name: "author", content: "Регион Логистик (ООО «РегионЛогистик»)"},
            {name: "theme-color", content: "#ffffff"},
            {name: "apple-mobile-web-app-status-bar-style", content: "default"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Golos+Text:wght@400;500;600;700&display=swap",
            },
            {rel: "icon", href: "/favicon.ico", sizes: "any"},
            {rel: "icon", type: "image/svg+xml", href: FAVICON},
            {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
            {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
            {rel: "icon", type: "image/png", sizes: "120x120", href: "/favicon-120x120.png"},
            {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
            {rel: "manifest", href: "/site.webmanifest"},
            {rel: "alternate", type: "application/rss+xml", title: "Блог Регион Логистик", href: "/rss.xml"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(ORG_JSON_LD)},
            {children: ROTOR_SCRIPT},
            {children: METRIKA_SCRIPT},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFoundSeo,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <ScrollToTop/>
                <RouteTracker/>
                <PromoPopup/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/110764663" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
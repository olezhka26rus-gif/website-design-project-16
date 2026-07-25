
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RouteTracker from "./components/RouteTracker";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import Privacy from "./pages/Privacy";
import NotFoundSeo from "./pages/NotFoundSeo";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:country/:slug" element={<CarDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundSeo />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
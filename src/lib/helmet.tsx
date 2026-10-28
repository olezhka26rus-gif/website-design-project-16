import type { ReactNode } from 'react';

/**
 * Замена react-helmet-async: React 19 сам поднимает <title>, <meta> и <link>
 * в <head> (и при серверном рендере), поэтому достаточно отрисовать детей.
 */
export function Helmet({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export default Helmet;

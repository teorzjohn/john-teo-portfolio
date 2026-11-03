import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectPage } from './pages/ProjectPage';
import { NotFound } from './pages/NotFound';
import { About } from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';
import { useReducedMotion } from './hooks/useReducedMotion';
import type { Location } from 'react-router-dom';

gsap.registerPlugin(useGSAP);

export default function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const routeRef = useRef<HTMLDivElement>(null);
  const isFirstRouteRenderRef = useRef(true);
  const exitTweenRef = useRef<gsap.core.Tween | null>(null);
  const [displayLocation, setDisplayLocation] = useState<Location>(location);

  const { contextSafe } = useGSAP({ scope: routeRef });

  useEffect(() => {
    if (location.key === displayLocation.key) {
      return undefined;
    }

    const routeElement = routeRef.current;

    exitTweenRef.current?.kill();

    if (prefersReducedMotion || !routeElement) {
      setDisplayLocation(location);
      return undefined;
    }

    exitTweenRef.current = gsap.to(routeElement, {
      autoAlpha: 0,
      y: -8,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: contextSafe(() => {
        setDisplayLocation(location);
      }),
    });

    return () => {
      exitTweenRef.current?.kill();
    };
  }, [contextSafe, displayLocation.key, location, prefersReducedMotion]);

  useGSAP(() => {
    const routeElement = routeRef.current;

    if (!routeElement) {
      return undefined;
    }

    if (isFirstRouteRenderRef.current || prefersReducedMotion) {
      gsap.set(routeElement, { autoAlpha: 1, y: 0, clearProps: 'transform,visibility,opacity' });
      isFirstRouteRenderRef.current = false;
      return undefined;
    }

    gsap.fromTo(
      routeElement,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.24,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(routeElement, { clearProps: 'transform' });
        },
      },
    );

    return undefined;
  }, { dependencies: [displayLocation.key, prefersReducedMotion], scope: routeRef });

  return (
    <Layout>
      <ScrollToTop pathname={displayLocation.pathname} />
      <div ref={routeRef}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Layout>
  );
}

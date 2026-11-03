import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const isProjectPage = pathname.startsWith('/work/');
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    setIsHeaderHidden(false);

    if (!isProjectPage) {
      return undefined;
    }

    let previousScrollY = window.scrollY;
    let idleTimeout: number | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      if (currentScrollY <= 8) {
        setIsHeaderHidden(false);
      } else if (
        Math.abs(scrollDelta) > 1 &&
        Math.abs(scrollDelta) <= window.innerHeight * 1.5
      ) {
        setIsHeaderHidden(scrollDelta > 0);
      }

      window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => setIsHeaderHidden(false), 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(idleTimeout);
    };
  }, [isProjectPage, pathname]);

  return (
    <>
      <header
        className="site-header"
        data-scroll-aware={isProjectPage ? 'true' : undefined}
        data-hidden={isProjectPage && isHeaderHidden ? 'true' : undefined}
      >
        <div className="site-header-inner layout-container">
          <Link className="brand" to="/" aria-label="Go to home">
            JT
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/work">Work</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}

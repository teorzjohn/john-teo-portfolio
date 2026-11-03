import { useLayoutEffect } from 'react';

type ScrollToTopProps = {
  pathname: string;
};

export function ScrollToTop({ pathname }: ScrollToTopProps) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

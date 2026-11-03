import { useLayoutEffect, useRef, useState } from 'react';
import type { ProjectMedia } from '../data/projects';

type VerticalLoopGalleryProps = {
  media: ProjectMedia[];
  title: string;
};

const centerCopy = 3;
const responsiveWidths = [1280, 2560];
const mobileScrollIdleDelay = 400;

const getWebpSrcSet = (src: string, width?: number) => {
  const isFullResolutionWebp = /-full\.webp$/i.test(src);
  const isRasterFallback = /\.(?:png|jpe?g)$/i.test(src);
  if ((!isFullResolutionWebp && !isRasterFallback) || !width) {
    return undefined;
  }

  const basePath = isFullResolutionWebp
    ? src.replace(/-full\.webp$/i, '')
    : src.replace(/\.(?:png|jpe?g)$/i, '');
  const widths = [...new Set(responsiveWidths.map((targetWidth) => Math.min(targetWidth, width)))];

  return widths.map((variantWidth) => `${basePath}-${variantWidth}.webp ${variantWidth}w`).join(', ');
};

export function VerticalLoopGallery({ media, title }: VerticalLoopGalleryProps) {
  const galleryRef = useRef<HTMLElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cyclePeriodRef = useRef(0);
  const [copyCount, setCopyCount] = useState(7);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const middleCopy = copyRefs.current[centerCopy];

    if (!gallery || !middleCopy || media.length === 0) {
      return undefined;
    }

    let isCancelled = false;
    let isPositioned = false;
    let positioningFrame = 0;
    let scrollIdleTimeout: number | undefined;
    const supportsScrollEnd = 'onscrollend' in document;

    const getHeaderHeight = () =>
      document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;

    const getCyclePeriod = () => {
      const rowGap = Number.parseFloat(window.getComputedStyle(gallery).rowGap) || 0;
      return middleCopy.getBoundingClientRect().height + rowGap;
    };

    const getRequiredCopyCount = (cyclePeriod: number) => {
      const rowGap = Number.parseFloat(window.getComputedStyle(gallery).rowGap) || 0;
      const trailingCopies = Math.max(
        isMobileViewport() ? centerCopy : 1,
        Math.ceil((window.innerHeight + rowGap - getHeaderHeight()) / cyclePeriod),
      );

      return centerCopy + 1 + trailingCopies;
    };

    const isMobileViewport = () =>
      window.matchMedia('(max-width: 860px), (any-pointer: coarse)').matches;

    const updateCopyCount = (cyclePeriod: number) => {
      if (cyclePeriod <= 0) {
        return;
      }

      const requiredCount = getRequiredCopyCount(cyclePeriod);
      setCopyCount((currentCount) => currentCount === requiredCount ? currentCount : requiredCount);
    };

    const scrollImmediately = (top: number) => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, Math.max(0, top));
      root.style.scrollBehavior = previousScrollBehavior;
    };

    const getScrollOffset = () => {
      const cyclePeriod = cyclePeriodRef.current;

      if (!isPositioned || cyclePeriod <= 0) {
        return undefined;
      }

      const middleTop = middleCopy.getBoundingClientRect().top + window.scrollY;
      const firstCycleScrollTop = middleTop - getHeaderHeight();
      return window.scrollY - firstCycleScrollTop;
    };

    const repositionIfNeeded = () => {
      const cyclePeriod = cyclePeriodRef.current;
      const scrollOffset = getScrollOffset();

      if (scrollOffset === undefined || cyclePeriod <= 0) {
        return;
      }

      if (scrollOffset < 0) {
        const cyclesToAdd = Math.ceil(-scrollOffset / cyclePeriod);
        scrollImmediately(window.scrollY + cyclesToAdd * cyclePeriod);
      } else if (scrollOffset >= cyclePeriod) {
        const cyclesToSubtract = Math.floor(scrollOffset / cyclePeriod);
        scrollImmediately(window.scrollY - cyclesToSubtract * cyclePeriod);
      }
    };

    const handleScroll = () => {
      if (!isPositioned || cyclePeriodRef.current <= 0) {
        return;
      }

      if (!isMobileViewport()) {
        window.clearTimeout(scrollIdleTimeout);
        repositionIfNeeded();
        return;
      }

      if (supportsScrollEnd) {
        return;
      }

      const scrollOffset = getScrollOffset();
      const cyclePeriod = cyclePeriodRef.current;
      if (scrollOffset === undefined || (scrollOffset >= 0 && scrollOffset < cyclePeriod)) {
        window.clearTimeout(scrollIdleTimeout);
        return;
      }

      window.clearTimeout(scrollIdleTimeout);
      scrollIdleTimeout = window.setTimeout(repositionIfNeeded, mobileScrollIdleDelay);
    };

    const handleScrollEnd = () => {
      if (isMobileViewport()) {
        window.clearTimeout(scrollIdleTimeout);
        repositionIfNeeded();
      }
    };

    const handleResize = () => {
      const cyclePeriod = getCyclePeriod();
      cyclePeriodRef.current = cyclePeriod;
      updateCopyCount(cyclePeriod);
    };

    const positionGallery = () => {
      positioningFrame = window.requestAnimationFrame(() => {
        positioningFrame = 0;

        if (isCancelled) {
          return;
        }

        cyclePeriodRef.current = getCyclePeriod();
        updateCopyCount(cyclePeriodRef.current);
        const galleryTop = gallery.getBoundingClientRect().top + window.scrollY;
        const initialScrollTop =
          galleryTop + cyclePeriodRef.current * centerCopy - getHeaderHeight();
        scrollImmediately(initialScrollTop);
        isPositioned = true;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (supportsScrollEnd) {
      document.addEventListener('scrollend', handleScrollEnd);
    }
    window.addEventListener('resize', handleResize);
    const galleryResizeObserver = typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(handleResize);
    galleryResizeObserver?.observe(middleCopy);
    positionGallery();

    return () => {
      isCancelled = true;
      if (positioningFrame) {
        window.cancelAnimationFrame(positioningFrame);
      }
      window.clearTimeout(scrollIdleTimeout);
      window.removeEventListener('scroll', handleScroll);
      if (supportsScrollEnd) {
        document.removeEventListener('scrollend', handleScrollEnd);
      }
      window.removeEventListener('resize', handleResize);
      galleryResizeObserver?.disconnect();
    };
  }, [media]);

  return (
    <section
      ref={galleryRef}
      className="vertical-loop-gallery"
      aria-label={`${title} image gallery`}
    >
      {Array.from({ length: copyCount }, (_, copyIndex) => (
        <div
          key={`gallery-copy-${copyIndex}`}
          ref={(element) => { copyRefs.current[copyIndex] = element; }}
          className="vertical-loop-cycle"
          aria-hidden={copyIndex !== centerCopy}
        >
          {media.map((item, imageIndex) => {
            const srcSet = getWebpSrcSet(item.src, item.width);
            const isPriorityImage = copyIndex === centerCopy && imageIndex === 0;

            return (
              <div
                key={`${copyIndex}-${item.src}`}
                className="vertical-loop-image-frame"
                data-image-state="loading"
                style={{
                  aspectRatio: item.width && item.height
                    ? `${item.width} / ${item.height}`
                    : undefined,
                }}
              >
                <picture className="vertical-loop-image-picture">
                  {srcSet ? (
                    <source
                      type="image/webp"
                      srcSet={srcSet}
                      sizes="100vw"
                    />
                  ) : null}
                  <img
                    className="vertical-loop-image image-loading-image"
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={isPriorityImage ? 'eager' : 'lazy'}
                    fetchPriority={isPriorityImage ? 'high' : 'low'}
                    decoding="async"
                    draggable={false}
                    onLoad={(event) => {
                      event.currentTarget.closest<HTMLElement>('.vertical-loop-image-frame')
                        ?.setAttribute('data-image-state', 'loaded');
                    }}
                    onError={(event) => {
                      event.currentTarget.closest<HTMLElement>('.vertical-loop-image-frame')
                        ?.setAttribute('data-image-state', 'error');
                    }}
                  />
                </picture>
                <span className="image-loading-skeleton" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}

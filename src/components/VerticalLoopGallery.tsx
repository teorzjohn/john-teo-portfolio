import { useLayoutEffect, useRef, useState } from 'react';
import type { ProjectMedia } from '../data/projects';

type VerticalLoopGalleryProps = {
  media: ProjectMedia[];
  title: string;
};

const centerCopy = 1;
const responsiveWidths = [1280, 2560];

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
  const [copyCount, setCopyCount] = useState(3);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const middleCopy = copyRefs.current[centerCopy];

    if (!gallery || !middleCopy || media.length === 0) {
      return undefined;
    }

    let isCancelled = false;
    let isPositioned = false;
    let positioningFrame = 0;

    const getHeaderHeight = () =>
      document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;

    const getCyclePeriod = () => {
      const rowGap = Number.parseFloat(window.getComputedStyle(gallery).rowGap) || 0;
      return middleCopy.getBoundingClientRect().height + rowGap;
    };

    const getRequiredCopyCount = (cyclePeriod: number) => {
      const rowGap = Number.parseFloat(window.getComputedStyle(gallery).rowGap) || 0;
      const trailingCopies = Math.max(
        1,
        Math.ceil((window.innerHeight + rowGap - getHeaderHeight()) / cyclePeriod),
      );

      return centerCopy + 1 + trailingCopies;
    };

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

    const handleScroll = () => {
      const cyclePeriod = cyclePeriodRef.current;

      if (!isPositioned || cyclePeriod <= 0) {
        return;
      }

      const middleTop = middleCopy.getBoundingClientRect().top + window.scrollY;
      const firstCycleScrollTop = middleTop - getHeaderHeight();
      const scrollOffset = window.scrollY - firstCycleScrollTop;

      if (scrollOffset < 0) {
        const cyclesToAdd = Math.ceil(-scrollOffset / cyclePeriod);
        scrollImmediately(window.scrollY + cyclesToAdd * cyclePeriod);
      } else if (scrollOffset >= cyclePeriod) {
        const cyclesToSubtract = Math.floor(scrollOffset / cyclePeriod);
        scrollImmediately(window.scrollY - cyclesToSubtract * cyclePeriod);
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
        const initialScrollTop = galleryTop + cyclePeriodRef.current - getHeaderHeight();
        scrollImmediately(initialScrollTop);
        isPositioned = true;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      window.removeEventListener('scroll', handleScroll);
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
              <picture
                key={`${copyIndex}-${item.src}`}
                className="vertical-loop-image-frame"
                style={{
                  aspectRatio: item.width && item.height
                    ? `${item.width} / ${item.height}`
                    : undefined,
                }}
              >
                {srcSet ? (
                  <source
                    type="image/webp"
                    srcSet={srcSet}
                    sizes="100vw"
                  />
                ) : null}
                <img
                  className="vertical-loop-image"
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={isPriorityImage ? 'eager' : 'lazy'}
                  fetchPriority={isPriorityImage ? 'high' : 'low'}
                  decoding="async"
                  draggable={false}
                  onLoad={(event) => {
                    event.currentTarget.dataset.loaded = 'true';
                  }}
                />
              </picture>
            );
          })}
        </div>
      ))}
    </section>
  );
}

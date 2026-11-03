import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { Project } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

type InfoDrawerProps = {
  project: Project;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type DrawerPhase = 'closed' | 'opening' | 'revealing' | 'open' | 'closing';

const easeInOut = 'power3.inOut';
const easeOut = 'power3.out';
const easeDramatic = 'power4.inOut';
const closedSurface = 'rgba(252, 252, 251, 0.72)';
const openSurface = '#fbfaf5';
const closeContentExitDelay = 0.18;

gsap.registerPlugin(useGSAP);

const getDrawerDimensions = () => {
  if (typeof window === 'undefined') {
    return {
      closedWidth: 122,
      closedHeight: 44,
      closedBottom: 32,
      closedRadius: 21.6,
      closedSurface,
      openWidth: 496,
      openHeight: 720,
      openBottom: 32,
      openRadius: 21.6,
      openSurface,
    };
  }

  const isMobile = window.innerWidth <= 860;
  const pageX = Math.min(Math.max(16, window.innerWidth * 0.03), 48);

  return {
    isMobile,
    closedWidth: isMobile ? 118 : 122,
    closedHeight: 44,
    closedBottom: isMobile ? 16 : 32,
    closedRadius: isMobile ? 16 : 21.6,
    closedSurface,
    openWidth: isMobile ? window.innerWidth : Math.min(496, window.innerWidth - pageX * 2),
    openHeight: isMobile ? window.innerHeight : Math.min(window.innerHeight * 0.84, 832),
    openBottom: isMobile ? 0 : 32,
    openRadius: isMobile ? 0 : 21.6,
    openSurface,
  };
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  );
};

type UseDrawerFocusTrapProps = {
  isOpen: boolean;
  phase: DrawerPhase;
  panelRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

function useDrawerFocusTrap({
  isOpen,
  phase,
  panelRef,
  triggerRef,
  onClose,
}: UseDrawerFocusTrapProps) {
  const shouldReturnFocusRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      shouldReturnFocusRef.current = true;
      return;
    }

    if (!isOpen && phase === 'closed' && shouldReturnFocusRef.current) {
      triggerRef.current?.focus();
      shouldReturnFocusRef.current = false;
    }
  }, [isOpen, phase, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(panelRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!panelRef.current?.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, panelRef]);
}

type DrawerPanelContentProps = {
  project: Project;
  titleId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

function DrawerPanelContent({
  project,
  titleId,
  closeRef,
  contentRef,
  onClose,
}: DrawerPanelContentProps) {
  return (
    <div ref={contentRef} className="drawer-chrome">
      <div className="drawer-top">
        <div className="drawer-top-copy">
          <h2 id={titleId} data-drawer-reveal>{project.title}</h2>
          {project.headerDescription && (
            <p className="drawer-top-description">{project.headerDescription}</p>
          )}
        </div>
        <button
          ref={closeRef}
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X aria-hidden="true" size={18} />
        </button>
      </div>

      <div className="drawer-content">
        <div className="drawer-outcome" data-drawer-reveal>
          <p className="drawer-outcome-label">Outcome</p>
          {typeof project.outcome === 'string' ? (
            <p className="drawer-outcome-copy">{project.outcome}</p>
          ) : (
            <ul className="drawer-outcome-copy drawer-outcome-list">
              {project.outcome.map((metric) => (
                <li key={`${metric.label}-${metric.period}`}>
                  {metric.label}, <em>{metric.period}</em>: {metric.result}
                </li>
              ))}
            </ul>
          )}
        </div>

        {project.summary && (
          <div className="drawer-heading drawer-summary" data-drawer-reveal>
            <p>{project.summary}</p>
          </div>
        )}

        <div className="drawer-copy">
          {project.extended.map((block) =>
            typeof block === 'string' ? (
              <p key={block} data-drawer-reveal>
                {block}
              </p>
            ) : (
              <section className="drawer-copy-section" key={block.heading}>
                <h3 className="drawer-copy-heading" data-drawer-reveal>
                  {block.heading}
                </h3>
                <div className="drawer-copy-section-body">
                  {block.paragraphs.map((paragraph, index) => (
                    <p key={`${block.heading}-${index}`} data-drawer-reveal>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function InfoDrawer({ project, isOpen, onOpen, onClose }: InfoDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();
  const titleId = useId();
  const shellRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRequestedRef = useRef(isOpen);
  const [phase, setPhase] = useState<DrawerPhase>(isOpen ? 'open' : 'closed');
  const [isTriggerLabelVisible, setIsTriggerLabelVisible] = useState(!isOpen);
  const [isKeyboardFocusVisible, setIsKeyboardFocusVisible] = useState(false);

  const { contextSafe } = useGSAP({ scope: shellRef });

  useDrawerFocusTrap({ isOpen, phase, panelRef, triggerRef, onClose });

  useLayoutEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        setIsKeyboardFocusVisible(true);
      }
    };

    const handlePointerDown = () => {
      setIsKeyboardFocusVisible(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useGSAP(() => {
    const shell = shellRef.current;
    const dimensions = getDrawerDimensions();

    if (!shell) {
      return undefined;
    }

    timelineRef.current?.kill();

    const closedState = {
      width: dimensions.closedWidth,
      height: dimensions.closedHeight,
      bottom: dimensions.closedBottom,
      borderRadius: dimensions.closedRadius,
      backgroundColor: dimensions.closedSurface,
    };

    const openState = {
      width: dimensions.openWidth,
      height: dimensions.openHeight,
      bottom: dimensions.openBottom,
      borderRadius: dimensions.openRadius,
      backgroundColor: dimensions.openSurface,
    };

    if (prefersReducedMotion) {
      gsap.set(shell, isOpen ? openState : closedState);
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { autoAlpha: isOpen ? 1 : 0 });
      }
      if (contentRef.current) {
        gsap.set(contentRef.current, { autoAlpha: isOpen ? 1 : 0 });
      }
      gsap.set(contentRef.current?.querySelectorAll('[data-drawer-reveal]') ?? [], {
        autoAlpha: isOpen ? 1 : 0,
        y: 0,
      });
      setPhase(isOpen ? 'open' : 'closed');
      setIsTriggerLabelVisible(!isOpen);
      if (!isOpen) {
        isOpenRequestedRef.current = false;
      }

      return undefined;
    }

    const timeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => {
        if (isOpen) {
          setPhase('open');
        } else {
          isOpenRequestedRef.current = false;
          setIsTriggerLabelVisible(true);
          setPhase('closed');
        }
      },
    });
    timelineRef.current = timeline;

    if (isOpen) {
      const revealItems = contentRef.current?.querySelectorAll('[data-drawer-reveal]') ?? [];

      setPhase('opening');
      setIsTriggerLabelVisible(false);

      gsap.set(shell, closedState);
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { autoAlpha: 0 });
      }
      if (contentRef.current) {
        gsap.set(contentRef.current, { autoAlpha: 0 });
      }
      gsap.set(revealItems, { autoAlpha: 0, y: 2 });

      if (backdropRef.current) {
        timeline.to(backdropRef.current, { autoAlpha: 1, duration: 0.18, ease: easeOut }, 0);
      }

      if (dimensions.isMobile) {
        timeline.to(
          shell,
          {
            ...openState,
            duration: 0.66,
            ease: easeDramatic,
          },
          0,
        );
        timeline.call(() => setPhase('revealing'), undefined, 0.5);
      } else {
        timeline.to(
          shell,
          {
            width: dimensions.openWidth,
            bottom: dimensions.openBottom,
            borderRadius: dimensions.openRadius,
            backgroundColor: dimensions.openSurface,
            duration: 0.56,
            ease: easeDramatic,
          },
          0,
        );
        timeline.to(
          shell,
          {
            height: dimensions.openHeight,
            duration: 0.7,
            ease: easeDramatic,
          },
          0.07,
        );
        timeline.call(() => setPhase('revealing'), undefined, 0.3);
      }

      if (contentRef.current) {
        timeline.to(contentRef.current, { autoAlpha: 1, duration: 0.18, ease: easeOut }, '>-0.1');
      }
      timeline.to(
        revealItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: easeOut,
          stagger: 0.018,
        },
        '<',
      );
    } else if (phase !== 'closed') {
      setPhase('closing');

      if (contentRef.current) {
        timeline.to(contentRef.current, { autoAlpha: 0, duration: closeContentExitDelay, ease: easeOut }, 0);
      }
      if (backdropRef.current) {
        timeline.to(backdropRef.current, { autoAlpha: 0, duration: 0.18, ease: easeOut }, 0);
      }

      if (dimensions.isMobile) {
        timeline.to(
          shell,
          {
            ...closedState,
            duration: 0.48,
            ease: easeInOut,
          },
          closeContentExitDelay,
        );
      } else {
        timeline.to(
          shell,
          {
            height: dimensions.closedHeight,
            duration: 0.58,
            ease: easeInOut,
          },
          closeContentExitDelay,
        );
        timeline.to(
          shell,
          {
            width: dimensions.closedWidth,
            bottom: dimensions.closedBottom,
            borderRadius: dimensions.closedRadius,
            backgroundColor: dimensions.closedSurface,
            duration: 0.52,
            ease: easeInOut,
          },
          closeContentExitDelay + 0.12,
        );
      }
    } else {
      gsap.set(shell, closedState);
    }

    return () => {
      timeline.kill();
    };
  }, { dependencies: [isOpen, prefersReducedMotion], scope: shellRef });

  useEffect(() => {
    if (!isOpen || phase !== 'open') {
      return undefined;
    }

    const resizeDrawer = () => {
      const shell = shellRef.current;

      if (!shell) {
        return;
      }

      const dimensions = getDrawerDimensions();
      gsap.set(shell, {
        width: dimensions.openWidth,
        height: dimensions.openHeight,
        bottom: dimensions.openBottom,
        borderRadius: dimensions.openRadius,
        backgroundColor: dimensions.openSurface,
      });
    };

    resizeDrawer();
    window.addEventListener('resize', resizeDrawer);

    return () => {
      window.removeEventListener('resize', resizeDrawer);
    };
  }, [isOpen, phase]);

  const showPanel = phase !== 'closed';
  const showTrigger = phase === 'closed';
  const showTriggerLabel = showTrigger && isTriggerLabelVisible;

  useEffect(() => {
    if (!showTriggerLabel || prefersReducedMotion || !labelRef.current) {
      return;
    }

    const tween = gsap.fromTo(
      labelRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: easeOut, overwrite: 'auto' },
    );

    return () => {
      tween.kill();
    };
  }, [showTriggerLabel, prefersReducedMotion]);

  const handleOpen = contextSafe(() => {
    if (isOpenRequestedRef.current) {
      return;
    }

    isOpenRequestedRef.current = true;

    const openDrawer = () => {
      setPhase('opening');
      onOpen();
    };

    if (prefersReducedMotion || !labelRef.current) {
      openDrawer();
      return;
    }

    gsap.to(labelRef.current, {
      autoAlpha: 1,
      y: '1.05em',
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: openDrawer,
    });
  });

  return (
    <>
      {showPanel ? (
        <button
          ref={backdropRef}
          className="drawer-backdrop"
          aria-label="Close project information"
          tabIndex={-1}
          onClick={onClose}
        />
      ) : null}

      <div
        ref={shellRef}
        className="drawer-shell"
        data-keyboard-focus={isKeyboardFocusVisible}
        data-panel={showPanel}
      >
        {showPanel ? (
          <aside
            ref={panelRef}
            id={panelId}
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
          >
            <DrawerPanelContent
              project={project}
              titleId={titleId}
              closeRef={closeRef}
              contentRef={contentRef}
              onClose={onClose}
            />
          </aside>
        ) : (
          showTrigger ? (
            <button
              ref={triggerRef}
              className="project-info-button"
              type="button"
              onClick={handleOpen}
              aria-controls={panelId}
              aria-expanded={isOpen}
              aria-label="Open project information"
            >
              {showTriggerLabel ? (
                <span className="project-info-button-label">
                  <span ref={labelRef}>+ More info</span>
                </span>
              ) : null}
            </button>
          ) : null
        )}
      </div>
    </>
  );
}

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MotionPage } from '../components/MotionPage';
import { workGroups } from '../data/work';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(useGSAP);

export function Work() {
  const prefersReducedMotion = useReducedMotion();
  const workGroupsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.from('.work-group-heading, .work-row', {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: 'power3.out',
      stagger: 0.05,
      clearProps: 'transform,opacity',
    });
  }, {
    dependencies: [prefersReducedMotion],
    scope: workGroupsRef,
    revertOnUpdate: true,
  });

  return (
    <MotionPage className="work-page layout-container">
      <h1 className="work-intro" data-node-id="15:33">
        From B2B to consumer products, I&apos;m a designer who blends hands-on craft with shaping
        design vision and product strategy. These are some of my highlights.
      </h1>

      <div ref={workGroupsRef} className="work-groups" data-node-id="15:27">
        {workGroups.map((group) => (
          <section className="work-group" key={group.company} aria-labelledby={`work-${group.company}`}>
            <div className="work-group-heading">
              <h2 id={`work-${group.company}`} data-node-id={`work-${group.company}`}>
                {group.company}
              </h2>
              <p>{group.period}</p>
            </div>

            <ul className="work-list">
              {group.items.map((item) => {
                const rowContent = (
                  <>
                    <span className="work-item-name">{item.name}</span>
                    <span className="work-item-description">{item.description}</span>
                    <span className="work-item-year">{item.year}</span>
                    <span className="work-item-action">
                      {item.href ? 'Learn more' : null}
                    </span>
                  </>
                );

                return (
                  <li
                    className={`work-row ${item.href ? 'work-row-linked' : 'work-row-static'}`}
                    key={`${group.company}-${item.name}`}
                  >
                    {item.href ? (
                      <Link
                        className="work-row-content work-row-link"
                        to={item.href}
                        aria-label={`Learn more about ${item.name}`}
                      >
                        {rowContent}
                      </Link>
                    ) : (
                      <div className="work-row-content">{rowContent}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </MotionPage>
  );
}

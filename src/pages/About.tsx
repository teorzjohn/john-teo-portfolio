import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { MotionPage } from '../components/MotionPage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { assetPath } from '../utils/assetPath';

gsap.registerPlugin(useGSAP);

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const engagementsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.from(
      '.about-engagements h2, .about-engagement-row',
      {
        opacity: 0,
        y: 8,
        duration: 0.3,
        ease: 'power3.out',
        stagger: 0.05,
        clearProps: 'transform,opacity',
      },
    );
  }, {
    dependencies: [prefersReducedMotion],
    scope: engagementsRef,
    revertOnUpdate: true,
  });

  return (
    <MotionPage className="about-page">
      <section className="about-hero layout-container">
        <div className="about-content">
          <ul className="about-lines" aria-label="Design experience range">
            <li>From research to implementation</li>
            <li>From physical to digital products</li>
            <li>From consultancy to in-house</li>
          </ul>

          <div className="about-intro">
            <h1>Hey, I&apos;m John</h1>
          </div>

          <div className="about-copy" aria-label="Designer profile">
            <p>
              To me, design has always felt like a puzzle. It&apos;s not about finding the perfect
              solution, but the right fit for the situation at hand. That comes from understanding
              context, questioning assumptions, and knowing when to push an idea forward and when to
              simplify.
            </p>
            <p>
              In 2018, I joined Fjord (Accenture) in Singapore, designing services and products for
              clients across Southeast Asia in a range of sectors.
            </p>
            <p>
              In 2021, I moved in-house to Adidas in Germany, where I led design for Adidas
              Confirmed, the brand&apos;s flagship platform for high-heat collaborations and
              exclusive drops.
            </p>
            <p>
              Since 2024, I&apos;ve been at Aize in Norway, helping teams visualise, navigate and
              collaborate on digital twins of heavy assets.
            </p>
            <p>
              If you&apos;re up for a chat or keen on collaborating, drop me a message at{' '}
              <a href="mailto:teorzjohn@gmail.com">teorzjohn@gmail.com</a>.
            </p>
          </div>

        </div>

        <figure className="about-portrait">
          <img
            src={assetPath('/about/profile-full.webp')}
            alt="Portrait of John Teo"
          />
        </figure>

        <section
          ref={engagementsRef}
          className="about-engagements"
          aria-labelledby="about-engagements-title"
        >
          <h2 id="about-engagements-title">Engagements</h2>
          <ul className="about-engagements-list">
            <li className="about-engagement-row">
              <span className="about-engagement-role">Speaker</span>
              <span className="about-engagement-detail">
                DesignMatters Copenhagen, Leading by Craft
              </span>
              <span className="about-engagement-year">2023</span>
            </li>
            <li className="about-engagement-row">
              <span className="about-engagement-role">Adjunct Lecturer</span>
              <span className="about-engagement-detail">Singapore Polytechnic</span>
              <span className="about-engagement-year">2021</span>
            </li>
            <li className="about-engagement-row">
              <span className="about-engagement-role">Panel Speaker</span>
              <span className="about-engagement-detail">
                NUSDID Symposium, Emerging Design Landscapes
              </span>
              <span className="about-engagement-year">2018</span>
            </li>
            <li className="about-engagement-row">
              <span className="about-engagement-role">Panel Speaker</span>
              <span className="about-engagement-detail">Hive Singapore, Meet the Makers</span>
              <span className="about-engagement-year">2018</span>
            </li>
          </ul>
        </section>
      </section>
    </MotionPage>
  );
}

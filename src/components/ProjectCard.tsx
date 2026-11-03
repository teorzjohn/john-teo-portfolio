import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(useGSAP);

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handlePointerEnter = contextSafe(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    gsap.to(imageRef.current, {
      scale: 1.035,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  const handlePointerLeave = contextSafe(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  return (
    <article
      ref={cardRef}
      className={featured ? 'project-card project-card-featured' : 'project-card'}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Link to={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
        <div className="project-card-image">
          {project.cover ? (
            <img
              ref={imageRef}
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
            />
          ) : null}
        </div>
        <div className="project-card-meta">
          <div>
            <h2>{project.title}</h2>
            <p>{project.discipline}</p>
          </div>
          <span>
            {project.year}
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        </div>
      </Link>
    </article>
  );
}

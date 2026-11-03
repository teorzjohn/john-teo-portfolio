import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { InfoDrawer } from '../components/InfoDrawer';
import { MotionPage } from '../components/MotionPage';
import { VerticalLoopGallery } from '../components/VerticalLoopGallery';
import { getProject } from '../data/projects';

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const galleryMedia = useMemo(
    () => (project ? [...(project.cover ? [project.cover] : []), ...project.media] : []),
    [project],
  );
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    setIsInfoOpen(false);
  }, [slug]);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <MotionPage className="project-page">
      <section
        className="media-sequence layout-container media-sequence-looping-gallery"
        aria-label={`${project.title} media`}
      >
        {galleryMedia.length > 0 ? (
          <VerticalLoopGallery
            title={project.title}
            media={galleryMedia}
          />
        ) : (
          <div className="project-gallery-placeholder">
            <p>
              <span>{project.company} · {project.year}</span>
              <br />
              Screenshots will be added here
            </p>
          </div>
        )}
      </section>

      <InfoDrawer
        project={project}
        isOpen={isInfoOpen}
        onOpen={() => setIsInfoOpen(true)}
        onClose={() => setIsInfoOpen(false)}
      />
    </MotionPage>
  );
}

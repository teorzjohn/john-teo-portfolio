import { Link } from 'react-router-dom';
import { MotionPage } from '../components/MotionPage';
import { homeFeaturedProjects } from '../data/homeFeatured';

export function Home() {
  return (
    <MotionPage className="home-page">
      <section className="home-hero layout-container" aria-labelledby="home-title">
        <h1 id="home-title">
          John Teo is a designer.
        </h1>
        <div className="home-hero-meta" aria-label="Designer details">
          <p>Staff Product Designer at Aize</p>
          <p>Based in Oslo, Norway</p>
          <p>From Singapore</p>
        </div>
      </section>

      <section
        className="home-projects layout-container"
        id="work"
        aria-label="Selected projects"
      >
        <div className="home-projects-shell">
          <div className="home-project-grid">
            {homeFeaturedProjects.map((project, index) => (
              <article className="home-project-tile" key={project.slug}>
                <Link
                  className="home-project-card"
                  to={`/work/${project.slug}`}
                  aria-label={`View ${project.headline} case study`}
                  data-image-crop={project.image.crop}
                >
                  <img
                    className="home-project-image"
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                  <span className="home-project-shade" aria-hidden="true" />
                  <span className="home-project-copy">
                    <span className="home-project-category">{project.category}</span>
                    <h2 className="home-project-title">
                      {project.headlineLines ? (
                        <>
                          {project.headlineLines[0]}
                          <br />
                          {project.headlineLines[1]}
                        </>
                      ) : (
                        project.headline
                      )}
                    </h2>
                    <span className="home-project-caption">{project.caption}</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <Link className="home-projects-all" to="/work">
            View all work
          </Link>
        </div>
      </section>

      <footer className="site-footer layout-container">
        <p>Let's chat</p>
        <a href="mailto:teorzjohn@gmail.com">teorzjohn@gmail.com</a>
      </footer>
    </MotionPage>
  );
}

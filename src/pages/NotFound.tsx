import { Link } from 'react-router-dom';
import { MotionPage } from '../components/MotionPage';

export function NotFound() {
  return (
    <MotionPage className="not-found-page layout-container">
      <p className="eyebrow">404</p>
      <h1>This page slipped out of the frame.</h1>
      <Link to="/">Return to work</Link>
    </MotionPage>
  );
}

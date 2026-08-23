import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@phient/pui';
import PrimitivesPage from '../pages/PrimitivesPage';
import LayoutPage from '../pages/LayoutPage';
import FormsPage from '../pages/FormsPage';
import OverlaysPage from '../pages/OverlaysPage';
import FeedbackPage from '../pages/FeedbackPage';
import NavigationPage from '../pages/NavigationPage';
import ShowcasePage from '../pages/ShowcasePage';
import MediaPage from '../pages/MediaPage';
import CommercePage from '../pages/CommercePage';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import PlayPage from '../pages/PlayPage';
import styles from '../App.module.scss';

export const AppRoutes = () => (
  <Container fluid className={styles.content}>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/overview" element={<HomePage />} />
      <Route path="/play" element={<PlayPage />} />
      <Route path="/primitives/*" element={<PrimitivesPage />} />
      <Route path="/layout/*" element={<LayoutPage />} />
      <Route path="/forms/*" element={<FormsPage />} />
      <Route path="/overlays/*" element={<OverlaysPage />} />
      <Route path="/feedback/*" element={<FeedbackPage />} />
      <Route path="/navigation/*" element={<NavigationPage />} />
      <Route path="/showcase/*" element={<ShowcasePage />} />
      <Route path="/media/*" element={<MediaPage />} />
      <Route path="/commerce/*" element={<CommercePage />} />
    </Routes>
  </Container>
);

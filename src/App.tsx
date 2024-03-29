import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import AddBlog from './pages/add-blog';
import EditBlog from './pages/edit-blog';
import DetailsPage from './pages/details-page';
import ScrollToTop from './components/scroll-to-top';
import AboutUs from './pages/about-us';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="details-page/:title/:postId" element={<DetailsPage />} />
          <Route path="edit-page/:postId" element={<EditBlog />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

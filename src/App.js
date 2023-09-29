import MainPage from './pages/MainPage/MainPage.js';
import BookFullPreview from './pages/BookFullPreview/BookFullPreview.js';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ROUTES } from './constants/Routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.HOME_PAGE} element={<MainPage />} />
        <Route path={ROUTES.BOOK_PREVIEW + ':bookId'} element={<BookFullPreview />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

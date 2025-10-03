import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Utilities from "./pages/Utilities";
import ThemeBuilder from "./pages/ThemeBuilder";
import Snippets from "./pages/Snippets";
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Layout route wraps all child paths */}
      <Route path="/" element={<AppLayout />}>
        {/* index route for “/” */}
        <Route index element={<Home />} />

        {/* nested routes */}
        <Route path="utilities" element={<Utilities />} />
        <Route path="theme" element={<ThemeBuilder />} />
        <Route path="snippets" element={<Snippets />} />

        {/* optional: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

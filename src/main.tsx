import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";

// Sora 페이지는 전용 폰트(윤우체 등)를 포함하므로 필요할 때만 로드되도록 lazy import
const Sora = lazy(() => import("./sora/Sora.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/sora"
        element={
          <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}>
            <Sora />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

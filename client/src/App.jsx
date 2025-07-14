import React from "react";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <div style={{ userSelect: "none" }}>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;

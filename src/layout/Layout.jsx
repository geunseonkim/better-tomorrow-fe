import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [mainVideoId, setMainVideoId] = useState(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (mainVideoId) {
      navigate(`/detail/${mainVideoId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onStartClick={handleStartClick} />
      <main className="flex-1">
        <Outlet context={{ setMainVideoId, mainVideoId }} />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

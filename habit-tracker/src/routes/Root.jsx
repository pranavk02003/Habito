import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <BottomNav />

    </div>
  );
};

export default Root;
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      <NavBar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

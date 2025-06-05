import React from "react";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className=" border-t border-primary/10 py-8 px-4">
      <div className="flex flex-col  text-center  items-center gap-4 text-sm font-quicksand">
        <div className="text-primary/70 text-center md:text-left">
          <p>© {new Date().getFullYear()} Plated. All rights reserved.</p>
        </div>

        <div className="text-primary/70 text-center ">
          <p>
            Developed by{" "}
            <span className="font-semibold text-primary">
              [Stephen Ogunjobi]
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

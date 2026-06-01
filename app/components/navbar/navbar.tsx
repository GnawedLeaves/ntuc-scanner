import React from "react";
import styles from "./navbar.module.css";
import { token } from "@/app/theme";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="fixed w-full h-fit px-2 py-6 bottom-0 flex items-center justify-center">
      <div
        className={`cardWithShadow flex gap-8 items-center justify-center rounded-3xl py-3 px-6 border-2 `}
        style={{
          backgroundColor: token.light.background,
          borderColor: token.light.borderColor,
        }}
      >
        <div className={styles.navbarItem}>
          <Link href={"/"}>Home</Link>
        </div>
        <div className={styles.navbarItem}>
          <Link href={"/"}>Scan</Link>
        </div>
        <div className={styles.navbarItem}>
          <Link href={"/"}>Stats</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

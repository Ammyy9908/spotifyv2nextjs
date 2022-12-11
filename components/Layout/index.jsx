import React from "react";
import styles from "./index.module.css";
function Layout({ children }) {
  return (
    <div
      className={`grid overflow-hidden grid-cols-2 w-full h-screen ${styles.layout}`}
    >
      {children}
    </div>
  );
}

export default Layout;

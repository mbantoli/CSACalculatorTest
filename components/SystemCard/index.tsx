import React from "react";

import styles from "./index.module.scss";

const SystemCard = ({
  children,
  systemId
}: {
  children: React.ReactNode;
  systemId: string;
}) => {
  return (
    <div className={styles.SystemCard}>
      <h1 className={styles.SystemId}>{systemId}</h1>
      <div className={styles.LogoWrapper}>
        <img
          className={styles.Logo}
          src="/static/iko-logo.png"
          alt="IKO Logo"
        />
      </div>
      {children}
    </div>
  );
};

export default SystemCard;

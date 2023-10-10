// LoadingOverlay.js

import React from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {/* Your logo image goes here */}
        <img src="./logo.svg" alt="Logo" />
      </div>
      Pending...
    </div>
  );
};

export default LoadingOverlay;

import React, { useState } from "react";
import styles from "./Switch.style.scss";

const Switch = () => {
  const [isOn, setIsOn] = useState(true);

  const handleSwitchToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={styles.switchContainer}>
      <div
        className={`${styles.switch} ${
          isOn ? styles.switchOn : styles.switchOff
        }`}
        onClick={handleSwitchToggle}>
        <div className={styles.switchButton}></div>
      </div>
      <div
        className={`${styles.led} ${
          isOn ? styles.greenLed : styles.redLed
        }`}></div>
    </div>
  );
};

export default Switch;

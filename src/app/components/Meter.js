// components/Meter.js
import React, { useEffect, useState } from "react";
import "./Meter.scss";

const Meter = ({ value, marker }) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    // Apply the animation class when the value changes
    setAnimationClass("animate");

    // Remove the animation class after a delay (adjust as needed)
    const timeout = setTimeout(() => {
      setAnimationClass("");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className='meter-container'>
      <div className={`meter ${animationClass}`}>
        <div className='value'>{value.toFixed(2)}</div>
        <div className='marker'>{marker}</div>
      </div>
    </div>
  );
};

export default Meter;

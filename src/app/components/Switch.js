// components/Switch.js
import React, { useState, useEffect } from "react";
import "./Switch.style.scss";
import StartFirebase from "../firebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";

const Switch = ({ l_Id, u_Id }) => {
  const [isOn, setIsOn] = useState(false);

  const handleSwitchToggle = async () => {
    await setIsOn(!isOn);

    const db = await StartFirebase();
    let userId = u_Id;
    let loadId = l_Id;

    // Update the data in the database
    await update(ref(db, "Users/" + userId + "/loads/" + loadId), {
      load1: !isOn,
    })
      .then(() => console.log("Data updated successfully"))
      .catch((err) => console.log(err.message));
  };

  const getData = async (id) => {
    const database = await StartFirebase();
    const dbRef = ref(database);
    await get(child(dbRef, "Users/" + id)).then((snapshot) => {
      if (snapshot.exists()) {
        setIsOn(snapshot.val().loads[l_Id].load1);
      }
    });
  };

  // Fetching Data
  useEffect(() => {
    getData(u_Id);
  }, []);

  return (
    <div className='switchContainer'>
      <div className={`led ${isOn ? "greenLedBright" : "grayLed"}`}></div>
      <div
        className={`switch ${isOn ? "on" : ""}`}
        onClick={handleSwitchToggle}>
        <div className={`switchButton ${isOn ? "on" : ""}`}></div>
      </div>
      <div className='switchName'>Load - {l_Id}</div>
    </div>
  );
};

export default Switch;

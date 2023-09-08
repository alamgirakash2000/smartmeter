import React, { useState, useEffect } from "react";
import "./Switch.style.scss";
import StartFirebase from "../firebaseConfig";
import {
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  child,
} from "firebase/database";

import Meter from "./Meter";

const Metering = ({ l_Id, u_Id }) => {
  const [isOn, setIsOn] = useState(false);
  const [current, setCurrent] = useState();
  const [voltage, setVoltage] = useState();
  const [power, setPower] = useState();
  const [theta, setTheta] = useState();
  const [energy, setEnergy] = useState();

  // Fetching Data
  useEffect(() => {
    const database = StartFirebase();
    const dbRef = ref(database);

    onValue(child(dbRef, "Users/" + u_Id), (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setCurrent(snapshot.val().current);
        setVoltage(snapshot.val().voltage);
        setPower(snapshot.val().power);
        setTheta(snapshot.val().factor);
        setEnergy(snapshot.val().energy);
      }
    });
  }, []);

  return (
    <div className='metering'>
      <div className='row my-3'>
        <div className='col-sm-4'>
          <Meter value={voltage} marker='V' />
        </div>
        <div className='col-sm-4'>
          <Meter value={current} marker='A' />
        </div>
        <div className='col-sm-4'>
          <Meter value={power} marker='Watt' />
        </div>

        <div className='row my-3 '>
          <div className='col-sm-4'>
            <Meter value={theta} marker='Deg' />
          </div>
          <div className='col-sm-4'>
            <Meter
              value={voltage ? Math.abs(Math.cos(theta * 0.01745329)) : 0}
              marker='pF'
            />
          </div>
          <div className='col-sm-4'>
            <Meter value={energy / 3600} marker='kWh' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metering;

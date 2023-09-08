"use client";

import styles from "./globals.scss";
import React, { useEffect, useState } from "react";
import StartFirebase from "./firebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";

import Switch from "./components/Switch";
import Metering from "./components/Metering";

export default function Home() {
  const [data, setData] = useState([]);
  const [db, setDb] = useState(null);
  let userId = "user01";

  // For inserting New user
  // const insertData = async () => {
  //   const db = await StartFirebase();
  //   await setDatabase(db);

  //   let userId = "user01;
  //   const user = {};

  //   await set(ref(db, "Users/" + userId), user).then(() => {
  //     console.log("Data write successful");
  //   });
  // };

  const getData = async (id) => {
    const database = await StartFirebase();
    await setDb(database);

    const dbRef = ref(database);
    await get(child(dbRef, "Users/" + id)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setData(snapshot.val());
      } else {
        console.log("No user Found");
      }
    });
  };

  // Fetching Data
  useEffect(() => {
    getData(userId);
  }, []);

  return (
    <main className={styles.main}>
      <div className='container py-3'>
        <h1 className='text-center my-5'>SMART-METERING SYSTEM</h1>
        <div className='meter_block'>
          <Metering l_Id={2} u_Id={userId} db={db} userData={data} />
        </div>
        <h1 className='text-success text-center mt-4'>
          These buttons are for controlling your load
        </h1>
        <div className='switch_block d-block'>
          <div className='row mb-3'>
            <div className='col-sm-6 my-4'>
              <Switch l_Id={0} u_Id={userId} db={db} userData={data} />
            </div>
            <div className='col-sm-6 my-4'>
              <Switch l_Id={1} u_Id={userId} db={db} userData={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

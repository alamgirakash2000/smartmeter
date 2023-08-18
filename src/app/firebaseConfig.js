import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBwpbKe52xLqmVXs5zJlSvNy5VkedgZ9jQ",
    authDomain: "smartmeter2-85065.firebaseapp.com",
    projectId: "smartmeter2-85065",
    storageBucket: "smartmeter2-85065.appspot.com",
    messagingSenderId: "1081179192918",
    appId: "1:1081179192918:web:a9a32313da2392065b05f7",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;

import { useState } from "react";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId:import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function Scoreboard () {
    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        const getScoreBoards = async () => {
            const statRef = collection(db, "scoreboard");
            const statSnap = await getDocs(statRef);
            const statData = statSnap.docs.map((a) => ({id: a.id,...a.data()}));
            console.log(statData)
            setScoreboard(statData);
        }

        getScoreBoards();
    }, []);


    return (
        <div>
            <h2>Scoreboard</h2>
            <ul>
                {scoreboard.map((a, index) => (
                    <li key={index}>
                        <p>Player - {a.id},  Amount of wins - {a.plays}</p>
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default Scoreboard
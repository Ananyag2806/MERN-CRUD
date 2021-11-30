import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

    const [foodName, setFoodName] = useState("");
    const [days, setDays] = useState(0);
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/read").then(response => {
            setFoodList(response.data);
        })
    }, []);


    const submit = () => {
        Axios.post("http://localhost:3001/insert", {
            foodName: foodName,
            days: days
        })
    }

    return (
        <div className="App">
            <h1>MERN CRUD Application</h1>

            <label>Food Name: </label>
            <input type='text' onChange={event => {
                setFoodName(event.target.value);
            }} />

            <label>Days since you ate: </label>
            <input type='number' onChange={event => {
                setDays(event.target.value);
            }} />

            <button onClick={submit} >Submit</button>

            <h1>Food List</h1>

            {foodList.map((val, key) => {
                return (
                    <div key={key}>
                        <h3>{val.foodName}</h3>
                        <h3>{val.daysSinceIAte}</h3>
                    </div>
                );
            })}

        </div>
    );
}

export default App;

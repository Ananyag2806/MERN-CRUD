import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

    const [foodName, setFoodName] = useState("");//to add
    const [days, setDays] = useState(0);//to add
    const [foodList, setFoodList] = useState([]);// to read
    const [newFoodName, setNewFoodName] = useState('');//to update

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

    const update = (id) => {
        Axios.put("http://localhost:3001/update", {
            id: id,
            newFoodName: newFoodName,
        })

    }
    const del = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`);
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

                        <input type='text' onChange={event => {
                            setNewFoodName(event.target.value);
                        }} />
                        <button onClick={() => update(val._id)}>Update</button>

                        <button onClick={() => del(val._id)}>Delete</button>
                    </div>
                );
            })}

        </div>
    );
}

export default App;

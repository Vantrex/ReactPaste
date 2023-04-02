import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PasteForm from "../form/PasteForm";
import PasteDisplay from "../paste/PasteDisplay"
import axios from "axios";
import {API_URL} from "../../util/consts";


function App() {
    axios.defaults.baseURL = API_URL
    axios.defaults.url = API_URL


    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" Component={PasteForm} />
                    <Route path="/:id" Component={PasteDisplay} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

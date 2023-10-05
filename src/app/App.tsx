import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PasteForm from "../component/form/PasteForm";
import PasteDisplay from "../component/paste/PasteDisplay"
import axios from "axios";
import {API_URL} from "../util/consts";
import PasteList from "../component/list/PasteList";


function App() {
    axios.defaults.baseURL = API_URL
    axios.defaults.url = API_URL


    return (
        <><Router basename={'/paste'}>
            <div className="app-background">
                <Routes>
                    <Route path="/*" Component={PasteForm}/>
                    <Route path="/:id" Component={PasteDisplay}/>
                </Routes>
            </div>
        </Router>
            <Router basename={""}>
            <div className="list-background">
                <Routes>
                    <Route path="/list" Component={PasteList}/>
                </Routes>
            </div>
        </Router></>
    );
}

export default App;

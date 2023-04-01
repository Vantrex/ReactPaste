import React from 'react';
import './App.css';
import PasteForm from "../form/paste.form";
import PasteDisplay from "../paste/paste"
import axios from "axios";
import {Paste} from "../../model/paste/paste";
import {API, EndPoints} from "../../util/consts";


function App() {
    const putPaste = async (title: string, content: string) => {
        const body = {
            title: title,
            content: content
        }
        await axios.put<Paste>(API.API_URL + EndPoints.PASTE, body).then(value => {
            window.location.pathname = "/" + value.data.id;
        })
    }

    return (
        <>
            {window.location.pathname.length === 1 ? <PasteForm onSubmit={(content: string, title: string) => {
                putPaste(title, content).then(r => console.log("yes"))
            }
            }></PasteForm> : <div className={"paste-container"}><PasteDisplay id={window.location.pathname.substring(1)}></PasteDisplay></div>}
        </>
    );
}

export default App;

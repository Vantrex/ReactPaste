import React, {useEffect} from 'react';
import './App.css';
import PasteForm from "../form/PasteForm";
import PasteDisplay from "../paste/PasteDisplay"
import axios from "axios";
import {Paste} from "../../model/paste/paste";
import {API_URL, EndPoints} from "../../util/consts";


function App() {

    useEffect(() => {
        document.title = process.env.REACT_APP_PASTE_API_URL
    })
    const putPaste = async (title: string, content: string) => {
        const body = {
            title: title,
            content: content
        }
        await axios.put<Paste>(API_URL + EndPoints.PASTE, body).then(value => {
            window.location.pathname = "/" + value.data.id;
        })
    }



    return (
        <>
            {window.location.pathname.length === 1 ? <PasteForm onSubmit={(content: string, title: string) => {
                putPaste(title, content)
            }
            }></PasteForm> : <PasteDisplay id={window.location.pathname.substring(1)}></PasteDisplay>}
        </>
    );
}

export default App;

import React, {useEffect, useState} from 'react'
import {Paste} from "../../model/paste/paste";
import axios from "axios";
import './PasteDisplay.css'
import {API_URL, EndPoints} from "../../util/consts";
import SyntaxHighlighter from "react-syntax-highlighter";

import {androidstudio} from "react-syntax-highlighter/dist/esm/styles/hljs";


function PasteDisplay(props: { id: string }) {

    const [paste, setPaste] = useState<Paste | null>(null)
    useEffect(() => {
        axios.get<Paste>(API_URL + EndPoints.PASTE + "/" + props.id)
            .then(response => setPaste(response.data))
    },)
    useEffect(() => {
        if (paste) {
            document.title = paste.title;
        }

    }, [paste])


    if (!paste)
        return <></>

    return (
        <>
            <div className={"container"}>
                <SyntaxHighlighter language="java"
                                   showLineNumbers={true}
                                   className={"syntax-highlighter"} style={androidstudio}>{paste.content}</SyntaxHighlighter>
            </div>
        </>
    );


}

export default PasteDisplay
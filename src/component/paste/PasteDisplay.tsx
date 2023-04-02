import React, {useEffect, useState} from 'react'
import {Paste} from "../../model/paste/paste";
import axios from "axios";
import './PasteDisplay.css'
import {EndPoints} from "../../util/consts";
import SyntaxHighlighter from "react-syntax-highlighter";

import {androidstudio} from "react-syntax-highlighter/dist/esm/styles/hljs";


function PasteDisplay() {

    const [paste, setPaste] = useState<Paste | null>(null)

    useEffect(() => {

        const id = window.location.pathname.substring(1);
        axios.get<Paste>(EndPoints.PASTE + "/" + id)
            .then(response => setPaste(response.data))

    })

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
                                   className={"syntax-highlighter"}
                                   style={androidstudio}>{paste.content}</SyntaxHighlighter>
            </div>
        </>
    );


}

export default PasteDisplay
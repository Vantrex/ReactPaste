import React, {useEffect, useState} from 'react'
import {Paste} from "../../model/paste/paste";
import axios from "axios";
import {API, EndPoints} from "../../util/consts";
import SyntaxHighlighter from "react-syntax-highlighter";
import { googlecode } from "react-syntax-highlighter/dist/esm/styles/hljs";


function PasteDisplay(props: {id: string}) {

    const [paste, setPaste] = useState<Paste|null>(null)
    useEffect(() => {
        axios.get<Paste>(API.API_URL + EndPoints.PASTE + "/" + props.id)
            .then(response => setPaste(response.data))
    }, )
    useEffect(() => {
        if (paste) document.title = paste ? paste.title : 'loading..'
    }, [paste])


    if (!paste)
        return <></>

    return (
        <pre><SyntaxHighlighter language="java" style={googlecode}>{paste.content}</SyntaxHighlighter></pre>
    );
}

export default PasteDisplay
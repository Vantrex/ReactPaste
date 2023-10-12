import React, {useEffect, useState} from 'react'
import './PasteForm.css'
import ConfirmPostForm from "./post/ConfirmPostForm";
import axios from "axios";
import {Paste} from "../../model/paste/paste";
import {EndPoints} from "../../util/consts";


function PasteForm() {
    const [pasteTitle, setPasteTitle] = useState('')
    const [pasteContent, setPasteContent] = useState<string>('')
    const [saving, setSaving] = useState(false)

    let ctrlSaving = false;
    const handleSaveShortcut = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'S')) {
            event.preventDefault()
            if (ctrlSaving) return
            setSaving(true)
            ctrlSaving = true;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleSaveShortcut);
        return () => {
            document.removeEventListener('keydown', handleSaveShortcut);
        }
    });


    const putPaste = async (title: string, content: string) => {
        const body = {
            title: title,
            content: content
        }
        return await axios.put<Paste>(EndPoints.PASTE, body);
    }

    useEffect(() => {
        if (saving) {
            let realTitle = pasteTitle;
            if (realTitle === '') {
                realTitle = pasteContent.substring(0, Math.min(20, pasteContent.length));
            }
            putPaste(realTitle, pasteContent).then(value =>
                window.location.pathname = "/" + value.data.id);

        }
    }, [pasteContent, pasteTitle, saving])


    return (
        <div className={"content-wrapper"}>
            <div className="symbols">
                <ConfirmPostForm onConfirm={title => {
                    if (title === undefined)
                        setPasteTitle(pasteContent.substring(0, Math.min(20, pasteContent.length)))
                    else {
                        setPasteTitle(title)
                    }
                    setSaving(true)
                }} onCancel={() => {

                }}></ConfirmPostForm>
            </div>
            <div className={"paste-container"}>
                <textarea className={"paste-area"} onChange={(e) => setPasteContent(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default PasteForm
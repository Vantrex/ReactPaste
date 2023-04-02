import React, {useEffect, useState} from 'react'
import './PasteForm.css'
import ConfirmPostForm from "./post/ConfirmPostForm";
import {Simulate} from "react-dom/test-utils";


function PasteForm({onSubmit}: any) {
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
    }, []);


    useEffect(() => {
        if (saving) {
            let realTitle = pasteTitle;
            if (realTitle === '') {
                realTitle = pasteContent.substring(0, Math.min(20, pasteContent.length));
            }
            onSubmit(pasteContent, realTitle)
        }
    }, [pasteTitle, saving])


    return (
        <div className={"content-wrapper"}>
            <div className="symbols">
                <ConfirmPostForm onConfirm={title1 => {
                    if (title1 === undefined)
                        setPasteTitle(pasteContent.substring(0, Math.min(20, pasteContent.length)))
                    else {
                        setPasteTitle(title1)
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
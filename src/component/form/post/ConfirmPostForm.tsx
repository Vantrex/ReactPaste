import React, {useEffect, useState} from 'react';
import save from './../../../save-icon.svg';

interface ConfirmProperties {
    onConfirm: (title: string | undefined) => void;
    onCancel: () => void;
}

function ConfirmPostForm(properties: ConfirmProperties) {
    const [showModal, setShowModal] = useState(false);
    const [pasteTitle, setPasteTitle] = useState<undefined | string>(undefined)


    const handleConfirm = () => {
        properties.onConfirm(pasteTitle)
        setShowModal(false);
    }

    const handleCancel = () => {
        properties.onCancel()
        setShowModal(false);
    }

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                handleCancel()
        }
        if (showModal)
            document.addEventListener('keydown', handleEscape)
        else
            document.removeEventListener('keydown', handleEscape);
    })


    return (
        <>
            <img className={"save-symbol"} src={save} alt="logo" width={40} height={40}
                 onClick={() => setShowModal(true)}/>
            {showModal && (
                <div className="modal-content">
                    <textarea className={"symbol-item"} value={pasteTitle}
                              onChange={event => setPasteTitle(event.target.value)}></textarea>
                    <button className={"symbol-item"} onClick={handleConfirm}>Save</button>
                    <button className={"symbol-item"} onClick={handleCancel}>X</button>
                </div>
            )}
        </>
    )
}

export default ConfirmPostForm
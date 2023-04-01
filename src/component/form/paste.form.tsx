import React, {useState} from 'react'
import './paste.form.css'

function PasteForm({onSubmit}: any) {
    const [ title, setTitle] = useState('')
    const [ content, setContent] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit(content, title);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PasteForm
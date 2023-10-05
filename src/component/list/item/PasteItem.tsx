import React, {useState} from "react";
import {Paste} from "../../../model/paste/paste";

interface Property {
    paste: Paste
}

function ContentPreview(property: Property) {
    if (property.paste.content.startsWith(property.paste.title))
        return <></>
    return (<h3>{property.paste.content.substring(0, 12)}</h3>)
}

function PasteItem(property: Property) {

    const[contentPreview, setContentPreview] = useState(false)
    const paste = property.paste;
    return (
        <>
            <div>
                <h2 onMouseOut={(e) => setContentPreview(false)} onMouseOver={(e) => setContentPreview(true)}>{paste.title}</h2>
                {contentPreview?<ContentPreview paste={paste}></ContentPreview> : null}
            </div>
        </>
    )
}

export default PasteItem
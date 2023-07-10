import React from "react";
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

    const paste = property.paste;
    return (
        <>
            <div>
                <h2 onMouseOver={(e) => console.log("mouse enter")}>{paste.title}</h2>

            </div>
        </>
    )
}

export default PasteItem
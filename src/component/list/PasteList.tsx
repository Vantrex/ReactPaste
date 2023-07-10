import React, {useEffect, useState} from "react";
import './PasteList.css'
import axios from "axios";
import {Paste} from "../../model/paste/paste";
import {EndPoints} from "../../util/consts";
import PasteItem from "./item/PasteItem";


function PasteList() {

    const [searchTitle, setSearchTitle] = useState('')
    const [rateLimit, setRateLimit] = useState(false)
    const [changedSearchTitle, setChangedSearchTitle] = useState(false)
    const [pastes, setPastes] = useState<Paste[] | undefined>(undefined)
    const [lastPaste, setLastPaste] = useState(null)
    const searchPastes = async () => {

        await axios.get<Paste[]>(EndPoints.PASTE + "/search/" + searchTitle, {
            params: {
                date: lastPaste ? lastPaste.createdAt : Date.now()
            },
        },)
            .then(value => {
                console.log(value)
                setPastes(value.data);
                setLastPaste(pastes.at(pastes.length - 1));
            })
    }

    useEffect(() => {
        if (!rateLimit) {
            setRateLimit(true)
            if (searchTitle.length > 0) {
                setLastPaste(null)
                searchPastes().catch((e) => console.log("error while fetching pastes", e))
            }
            setChangedSearchTitle(false)
            setTimeout(() => {
                setRateLimit(false)
                if (changedSearchTitle) {
                    if (searchTitle.length > 0) {
                        setLastPaste(null)
                        searchPastes().catch((e) => console.log("error while fetching pastes", e))
                    }
                    setChangedSearchTitle(false)
                }
            }, 500);
        }
    }, [searchTitle])

    return (
        <>
            <div className={"container"}>
                <div className={"search-header"}>
                    <form>
                        <input placeholder={"Search..."} onChange={(e) => {
                            setChangedSearchTitle(true)
                            setSearchTitle(e.target.value)
                        }
                        }></input>
                    </form>
                </div>
                <ul>
                    {pastes?.map((paste) => <PasteItem paste={paste}></PasteItem>)}
                </ul>
            </div>
        </>
    )
}

export default PasteList;
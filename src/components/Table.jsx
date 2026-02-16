import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile} from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faTrash, faStapler } from "@fortawesome/free-solid-svg-icons"

import * as ApifunctionsProMat from '../functions/productMaterial'

import '../assets/css/table.css'

// variaveis com style css
const cor1 = {
    color: '#3F80EA'
}

const cor2 = {
    color: '#565a5c'
}

const cor3 = {
    color: 'rgb(255, 87, 87)'
}

export function Table ({
    arrayObj, 
    pagina, 
    setIsConfirmVisible, 
    setIsFormAddVisible, 
    setIsTableVisible, 
    setIsModalVisible, 
    setIsLinkingVisible, 
    setElementFocus,
    setElementMat,
    setTypeRequest
}) {
    const [isVisible, setIsVisible] = useState (true)

    useEffect(()=>{
        switch (pagina) {
            case "Product":
                setIsVisible(true)
                break
            case "Material":
                setIsVisible(false)
                break
        }
    },[pagina])

    function confirmDelete (element) {
        setIsConfirmVisible(true)
        setElementFocus(element)
    }

    function edit (element) {
        setIsFormAddVisible(true)
        setIsTableVisible(false)
        setElementFocus(element)
        setTypeRequest("Edit")
    }

    async function record (element) {
        if (pagina === "Product") {
            const data = await ApifunctionsProMat.GetByProduct(element.id)
            setElementMat(data)
            setIsModalVisible(true)
            setElementFocus(element)
        }

        if (pagina === "Material") {
            setElementMat([])
            setIsModalVisible(true)
            setElementFocus(element)
        }
    }

    async function linking (element) {
        setElementFocus(element)
        setIsLinkingVisible(true)
    }

    return(
        <div className="Table">
            <ul className="Hud"> 
            <li className="Hud-id">ID</li>
                <li className="Hud-name">NOME</li>
                {isVisible && 
                    <li className="Hud-type">TIPO</li>
                }
                {isVisible && 
                    <li className="Hud-price">PREÇO</li>
                }
                
                <li className="Hud-stock">ESTOQUE</li>
                <li className="Hud-balance"></li>
            </ul>
            <div className="List">
                {arrayObj.length > 0 && arrayObj[0].id != null ? (
                    arrayObj.map((obj)=>(
                        <ul key={obj.id} className="registration"> 
                            <li className="List-Item id-list-item">{obj.id}</li>
                            <li className="List-Item name-list-item">{obj.name}</li>
                            {isVisible &&
                                <li className="List-Item type-list-item">{obj.type}</li>
                            }
                            {isVisible &&
                                <li className="List-Item price-list-item">{obj.price}</li>
                            }
                            <li className="List-Item stock-list-item">{obj.stockQuantity}</li>
                            <li className="List-Item stock-list-item">
                                <div className="btnsList">
                                    {isVisible &&
                                        <FontAwesomeIcon
                                        icon={faStapler}
                                        className="icon"
                                        style={cor2}
                                        onClick={() => {linking(obj)}}
                                        />
                                    }
                                    <FontAwesomeIcon
                                        icon={faFile}
                                        className="icon"
                                        style={cor2}
                                        onClick={() => {record(obj)}}
                                    />
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="icon"
                                        style={cor1}
                                        onClick={() => {edit(obj)}}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="icon"
                                        style={cor3}
                                        onClick={() => {confirmDelete(obj)}}
                                    />
                                </div>
                            </li>
                        </ul>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>Carregando...</p>
                )}
            </div>
        </div>
    )
}
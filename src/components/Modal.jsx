import React, { useEffect, useState } from "react";
import * as ApiFunctions from "../functions/productMaterial"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import '../assets/css/modal.css'

const cor3 = {
    color: 'rgb(255, 87, 87)',
    marginTop: '60px'
}

function Modal ({ setIsModalVisible, element, elementMat, setElementMat, name }) {
    const [isVisible, setIsVisible] = useState (true)
    //funções

    function fechar () {
        setIsModalVisible(false)
    }

    async function deleteMat (obj) {
        const request =  await ApiFunctions.DeleteProdMat(element.id, obj.rawMaterial.id)
        console.log(obj)
        const request2 =  await ApiFunctions.GetByProduct(element.id)
        setElementMat(request2)
    }

    useEffect(()=>{
        if (name === "Material") {
            setIsVisible(false)
        }

        if (name === "Product" && isVisible === false) {
            setIsVisible(true)
        }
    },[name])

    return (
        <div 
        className="modal-overlay" 
        onClick={fechar}
        >
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
            >
                <section className="topArea">
                    <h2>Ficha</h2>
                </section>
                <div className="centerArea">
                    <section>
                        <h3>{name}</h3>
                    </section>
                    <section className="ListProdMat">
                        <section className="internSection">
                            <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <label >Nome:</label>
                                
                                {isVisible && 
                                    <label >Tipo:</label>
                                }
                                {isVisible && 
                                    <label >Preço:</label>
                                }
                                <label >Estoque:</label>
                            </div>
                            <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <span>{element.name}</span>
                                {isVisible &&
                                    <span>{element.type}</span>
                                }

                                {isVisible &&
                                    <span>{element.price}</span>
                                }
                                <span>{element.stockQuantity}</span>
                            </div>
                        </section>
                    </section>
                </div>
                {isVisible &&
                    <div className="centerArea">
                    <section>
                        <h3>Materia Prima</h3>
                    </section>
                    <section className="ListProdMat">
                        {elementMat.map((obj)=>(
                            <section key={obj.id} className="internSection">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <label>Nome:</label>
                                    <label>Estoque:</label>
                                    <label>Quantidade Necessária:</label>
                                    
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <span> {obj.rawMaterial.name}</span>
                                    <span> {obj.rawMaterial.stockQuantity}</span>
                                    <span> {obj.usedQuantity}</span>
                                </div>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="icon"
                                    style={cor3}
                                    onClick={() => {deleteMat(obj)}}
                                />
                            </section>
                        ))}
                    </section>
                    </div>
                }
                <section className="bottomArea"></section>
            </div>
        </div>
    )
}

export default Modal
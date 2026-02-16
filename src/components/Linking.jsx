import React, { useState, useEffect, useRef } from "react";
import * as ApiFunctions from "../functions/productMaterial"
import * as ApiFunctionsMat from "../functions/material"

import '../assets/css/modal.css'

function Linking ({ setIsLinkingVisible, element }) {
   
    const [formData, setFormData] = useState ({
        productId: element.id,
        materialId: "",
        quantity: 0
    })
    const [arrayMateria, setArrayMateria] = useState ([])

    //funções

    function selectMateria(e) {
        const { value, selectedIndex, options } = e.target;
        const text = options[selectedIndex].text;

        setFormData((prevState) => ({
            ...prevState,
            materialId: value,
        }));
    }

    const handleMaterialChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const save = await ApiFunctions.Link(formData)
        setFormData(prev => ({
            ...prev,
            materialId: "",
            quantity: ""
        }))
        return
    }

    function fechar () {
        setIsLinkingVisible(false)
    }

    async function renderGerAll () {
        let dados
    
        const getData = await ApiFunctionsMat.GetAllMaterial()
    
        dados = getData
    
        setArrayMateria(dados)
      }
    
      useEffect(()=>{
          renderGerAll()
      },[])


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
                    <h2>Vincule os produtos as matérias primas</h2>
                </section>
                <form onSubmit={handleSubmit} className="formLink">
                    <div className="formAddContainer">
                            <div>
                                <label>Nome do Material:</label>
                                <select
                                    name="materialId"
                                    value={formData.materialId}
                                    style={{ width: '8.5rem', height: '1.8rem' }}
                                    onChange={selectMateria}
                                >
                                    <option value="">- Selecione -</option>
                                    {arrayMateria.map((Materia) => (
                                        <option key={Materia.id} value={Materia.id}>{Materia.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Quantidade necessária:</label>
                                <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                style={{
                                    height: '1.5rem',
                                    borderRadius: '5px' }}
                                onChange={handleMaterialChange}
                                />
                            </div>
                    </div>
                
                    <section style={{
                            marginTop: '2rem'
                        }}>
                        <button type="submit">Salvar</button>
                    </section>
                </form>
                <section className="bottomArea"></section>
            </div>
        </div>
    )
}

export default Linking
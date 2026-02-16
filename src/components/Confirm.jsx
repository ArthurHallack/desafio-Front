import React, { useState } from "react";
import * as ApiFunctions from "../functions/product"
import * as ApiFunctionsMat from "../functions/material"

import '../assets/css/confirm.css'

function Confirm({ setIsConfirmVisible, element, name, setRefresh }) {
    const stylo = {
        textDecoration: 'none'
    }

    const estiloHeader = {
        border: 'none'
    }

    const estiloBody = {
        display: 'flex',
        gap: '1rem'
    }

    //funções
    
    async function excluir () {
        switch (name) {
            case "Product":
                var data = await ApiFunctions.DeleteProduct(element.id)
                setRefresh(true)
                setIsConfirmVisible(false)
                break;
            case "Material":
                var data = await ApiFunctionsMat.DeleteMaterial(element.id)
                setRefresh(true)
                setIsConfirmVisible(false)
                break;
        }
    }

    function fechar () {
        setIsConfirmVisible(false)
    }


    return (
        <div id= "confirmContainer">
            <div style={estiloHeader}>
                <p>Deseja realmente excluir este registro ?</p>
            </div>
            <div style={estiloBody}>
                <button variant="primary" onClick={excluir}>Sim</button>
                <button variant="link" style={stylo} onClick={fechar}>Não</button>
            </div>
        </div>
    )
}

export default Confirm
import React, { useState, useEffect, useRef } from "react";

import * as ApiFunctions from '../functions/product'
import * as ApiFunctionsMat from '../functions/material'

import '../assets/css/form.css'

export function FormAdd({
    pagina, 
    setIsFormAddVisible, 
    setRefreshData, 
    setIsTableVisible, 
    typeRequest,
    elementFocus
}) {
    const [formDataProduct, setFormdataProduct] = useState({
      name: "",
      price: 0.0,
      stockQuantity: 0,
      type: "",
    });
  
    const [formDataMaterial, setFormdataMaterial] = useState({
      name: "",
      stockQuantity: 0,
    });

    const[areaProductVisible, setAreaProductVisible] = useState (true)
    const[areaMaterialVisible, setAreaMaterialVisible] = useState (false)

    useEffect(()=>{
        if(pagina === "Material") {
            setAreaMaterialVisible(true)
            setAreaProductVisible(false)
        }
    },[pagina])

    useEffect(()=>{
        if (typeRequest == "Edit" && elementFocus && pagina === "Product"){
            setFormdataProduct(prev => ({
                ...prev,
                name: elementFocus.name,
                price: elementFocus.price,
                stockQuantity: elementFocus.stockQuantity,
                type: elementFocus.type
            }))
        }

        if (typeRequest == "Edit" && elementFocus && pagina === "Material"){
            setFormdataMaterial(prev => ({
                ...prev,
                name: elementFocus.name,
                stockQuantity: elementFocus.stockQuantity,
            }))
        }
    },[typeRequest])

    const fechar = () => {
        setIsFormAddVisible(false)
        setIsTableVisible(true)
    }
  
    //handlechange area-----------------------------------------
    const handleProductChange = (e) => {
      const { name, value } = e.target;
      setFormdataProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleMaterialChange = (e) => {
      const { name, value } = e.target;
      setFormdataMaterial((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handlePriceBlur = () => {
        setFormdataProduct((prev) => ({
          ...prev,
          price: parseFloat(prev.price).toFixed(2),
        }));
      };
    //----------------------------------------------------------
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (pagina === "Product") {
            if(typeRequest == "Add") {
                const save = await ApiFunctions.SaveProduct(formDataProduct)
                setRefreshData(true)
                fechar()
                return
            }
            const data = {
                id: elementFocus.id,
	            name: formDataProduct.name,
                price: formDataProduct.price,
                stockQuantity: formDataProduct.stockQuantity,
                type: formDataProduct.type
            }
            const up = await ApiFunctions.UpdateProduct(data)
            setRefreshData(true)
            fechar()
            return
        }

        if (pagina === "Material") {
            if(typeRequest == "Add") {
                const save = await ApiFunctionsMat.SaveMaterial(formDataMaterial)
                setRefreshData(true)
                fechar()
                return
            }
            const data = {
                id: elementFocus.id,
	            name: formDataMaterial.name,
                stockQuantity: formDataMaterial.stockQuantity,
            }
            const up = await ApiFunctionsMat.UpdateMaterial(data)
            setRefreshData(true)
            fechar()
            return
        }
    }

    return (
      <form onSubmit={handleSubmit} className="formAdd">
        <div>
            <h3>Formulário de adição</h3>
            <p>Adicione um registro a tabela</p>
        </div>
        {/* SEÇÃO DE PRODUTO */}
        {areaProductVisible &&
            <div className="formAddContainer">
                <fieldset>
                    <label>Nome do Produto:</label>
                    <input
                    type="text"
                    name="name"
                    value={formDataProduct.name}
                    onChange={handleProductChange}
                    />
                </fieldset>
                <fieldset>
                    <label>Tipo:</label>
                    <select
                    name="type"
                    value={formDataProduct.type}
                    style={{ width: "8rem" }}
                    onChange={handleProductChange}
                    >
                        <option value="">Selecione</option>
                        <option value="CHOCOLATE">CHOCOLATE</option>
                        <option value="CAKE">CAKE</option>
                        <option value="CANDY">CANDY</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Preço:</label>
                    <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formDataProduct.price}
                    onChange={handleProductChange}
                    onBlur={handlePriceBlur}
                    />
                </fieldset>
                <fieldset>
                    <label>Quantidade em Estoque:</label>
                    <input
                    type="number"
                    name="stockQuantity"
                    value={formDataProduct.stockQuantity}
                    onChange={handleProductChange}
                    />
                </fieldset>
            </div>
        }
  
        {/* SEÇÃO DE MATERIAL */}
        {areaMaterialVisible &&
            <div className="formAddContainer">
                <fieldset>
                    <label>Nome do Material:</label>
                    <input
                    type="text"
                    name="name"
                    value={formDataMaterial.name}
                    onChange={handleMaterialChange}
                    />
                </fieldset>
        
                <fieldset>
                    <label>Quantidade:</label>
                    <input
                    type="number"
                    name="stockQuantity"
                    value={formDataMaterial.stockQuantity}
                    onChange={handleMaterialChange}
                    />
                </fieldset>
            </div>
        }

        <section style={{
                marginTop: '2rem'
            }}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={fechar}>Fechar</button>
        </section>
      </form>
    );
  }

  export function FormFilter({
    pagina, 
    setIsFormFilterVisible, 
    setArrayObj, 
    setIsTableVisible, 
    setRefreshData
}) {
    const [formData, setFormdata] = useState({
      name: "",
    });

    const fechar = () => {
        setIsFormFilterVisible(false)
        setIsTableVisible(true)
        setRefreshData(true)
    }
  
    //handlechange area-----------------------------------------
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    //----------------------------------------------------------
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let array = []
        if (pagina === "Product") {
            const result = await ApiFunctions.FindByName(formData.name)
            array.push(result)
            setArrayObj(array)
            fechar()
            return
        }

        if (pagina === "Material") {
            const result = await ApiFunctionsMat.FindByName(formData.name)
            array.push(result)
            setArrayObj(array)
            fechar()
            return
        }
    
    }

    return (
      <form onSubmit={handleSubmit} className="formAdd">
        <div>
            <h3>Formulário de filtragem</h3>
            <p>Adicione um filtro a tabela</p>
        </div>
        
            <div className="formAddContainer">
                <fieldset>
                    <label>Nome completo:</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    />
                </fieldset>
            </div>

        <section style={{
                marginTop: '2rem'
            }}>
            <button type="submit">Aplicar</button>
            <button type="button" onClick={fechar}>Remover</button>
        </section>
      </form>
    );
  }
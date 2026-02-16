import { useState, useEffect, useRef } from 'react'
import { Table } from '../components/Table'
import { Title } from '../components/Title';
import { FormAdd, FormFilter } from '../components/FormAdd';
import Confirm from '../components/Confirm';
import Modal from '../components/Modal';
import Linking from '../components/Linking';

import * as ApiFunctions from '../functions/material'

import '../App.css'

function Material() {

  const [arrayObj, setArrayObj] = useState([])
  const [elementFocus, setElementFocus] = useState()
  const [elementMat, setElementMat] = useState()
  const [typeRequest, setTypeRequest] = useState("")
  //area of ​​visibility-------------------------------------------
  const [isTableVisible, setIsTableVisible] = useState(true)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLinkingVisible, setIsLinkingVisible] = useState(false)
  const [isFormAddVisible, setIsFormAddVisible] = useState(false)
  const [isFormFilterVisible, setIsFormFilterVisible] = useState(false)
  //-------------------------------------------------------------
  const [refreshData, setRefreshData] = useState(false)

  async function renderGerAll () {
    let dados

    const getData = await ApiFunctions.GetAllMaterial()

    dados = getData

    setArrayObj(dados)
  }

  useEffect(()=>{
      renderGerAll()
  },[])

  useEffect(()=>{
      if (refreshData) {
        renderGerAll()
        setRefreshData(false)
      }
  },[refreshData])

  return (
    <>
      <Title 
      TitleTop={"Material"} 
      isTableVisible={isTableVisible}
      setIsTableVisible={setIsTableVisible}
      setIsFormAddVisible={setIsFormAddVisible}
      setIsFormFilterVisible={setIsFormFilterVisible}
      setTypeRequest={setTypeRequest}/>

      {isConfirmVisible &&
        <Confirm 
        setRefresh={setRefreshData} 
        name={"Material"} 
        element={elementFocus} 
        setIsConfirmVisible={setIsConfirmVisible}/>
      }

      {isModalVisible &&
        <Modal 
        setRefresh={setRefreshData} 
        name={"Material"} 
        element={elementFocus}
        elementMat={elementMat} 
        setElementMat={setElementMat}
        setIsModalVisible={setIsModalVisible}/>
      }

      {isLinkingVisible &&
        <Linking 
        setRefresh={setRefreshData} 
        name={"Material"} 
        element={elementFocus}
        setElementMat={setElementMat} 
        setIsLinkingVisible={setIsLinkingVisible}/>
      }

      {isFormAddVisible &&
        <FormAdd 
        pagina={"Material"} 
        setIsFormAddVisible={setIsFormAddVisible}
        setRefreshData={setRefreshData}
        setIsTableVisible={setIsTableVisible}
        typeRequest={typeRequest}
        elementFocus={elementFocus}/>
      }

      {isFormFilterVisible &&
        <FormFilter 
        pagina={"Material"} 
        setIsFormFilterVisible={setIsFormFilterVisible}
        setArrayObj={setArrayObj}
        setIsTableVisible={setIsTableVisible}
        setRefreshData={setRefreshData}/>
      }

      {isTableVisible && 
        <Table 
          arrayObj={arrayObj}
          pagina={"Material"} 
          setIsConfirmVisible={setIsConfirmVisible}
          setIsFormAddVisible={setIsFormAddVisible}
          setIsTableVisible={setIsTableVisible} 
          setIsModalVisible={setIsModalVisible}
          setIsLinkingVisible={setIsLinkingVisible}
          setElementFocus={setElementFocus}
          setElementMat={setElementMat}
          setTypeRequest={setTypeRequest}
        />
      }
    </>
  )
}

export default Material

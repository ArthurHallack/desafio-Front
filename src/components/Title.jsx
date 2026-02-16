import React, { useState, useEffect, useRef } from "react";
import {Plus, Funnel} from "lucide-react";

import '../assets/css/title.css'

export function Title({
  TitleTop, 
  isTableVisible, 
  setIsTableVisible, 
  setIsFormAddVisible,
  setIsFormFilterVisible,
  setTypeRequest
}) {
    const [btnVisible, setBtnVisible] = useState (true)

    useEffect(()=>{
        if (isTableVisible == false) {
          setBtnVisible(false)
        }

        if (isTableVisible == true && btnVisible == false) {
          setBtnVisible(true)
        }
    },[isTableVisible])

    function viewFormAdd () {
      setIsFormAddVisible(true)
      setIsTableVisible(false)
      setTypeRequest("Add")
    }
    
    function viewFormFilter () {
      setIsFormFilterVisible(true)
      setIsTableVisible(false)
    }

    return(
        <div className="TitleArea">
        <h1>{TitleTop}</h1>
        {btnVisible && 
          <section>
            <Plus  size={30} color="gray" className="iconPlusTitle" title="Adição" onClick={viewFormAdd}/>
            <Funnel  size={25} color="gray" className="iconFilterTitle" title="Filtro" onClick={viewFormFilter}/>
          </section>
        }
      </div>
    )
}
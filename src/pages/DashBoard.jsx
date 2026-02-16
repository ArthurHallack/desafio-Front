import { useState, useEffect } from 'react'

import * as ApiFunctions from '../functions/material'
import * as ApiFunctionsProd from '../functions/product'
import * as ApiFunctionsProdMat from '../functions/productMaterial'

import '../assets/css/dashboard.css'

function Dashboard () {

  const [arrayMaterial, setArrayMaterial] = useState([])
  const [arrayProduct, setArrayProduct] = useState([])
  const [arrayProdMat, setArrayProdMat] = useState([])
  //-------------------------------------------------------------

  async function renderGerAll () {

    const getData = await ApiFunctions.GetAllMaterial()
    const getData2 = await ApiFunctionsProd.GetAllProducts()
    const getData3 = await ApiFunctionsProdMat.GetAll()

    setArrayMaterial(getData)
    setArrayProduct(getData2)
    setArrayProdMat(getData3)
  }

  useEffect(()=>{
      renderGerAll()
  },[])

  const calculateRanking = () => {
    if (arrayProduct.length === 0 || arrayProdMat.length === 0) return [];
  
    const ranking = arrayProduct.map(product => {
      const productMaterials = arrayProdMat.filter(rel => rel.product.id === product.id);
  
      let canProduce = Infinity;
  
      productMaterials.forEach(rel => {
        const stockMaterial = arrayMaterial.find(m => m.id === rel.rawMaterial.id);
        
        if (stockMaterial) {
          const maxWithThisMaterial = Math.floor(stockMaterial.stockQuantity / rel.usedQuantity);
          if (maxWithThisMaterial < canProduce) {
            canProduce = maxWithThisMaterial;
          }
        } else {
          canProduce = 0;
        }
      });
  
      if (productMaterials.length === 0) canProduce = 0;
  
      return {
        ...product,
        possibleQuantity: canProduce,
        potentialProfit: canProduce * product.price
      };
    });
  
    return ranking.sort((a, b) => b.potentialProfit - a.potentialProfit);
  };
  
  const rankingList = calculateRanking();

  return (
    <div className="dashboard-container">
      <section>
        <h1>Dashboard</h1>
      </section>
  
      <div className="grid-dashboard">
        <div>
          <h2>Materiais em Estoque</h2>
          <ul>
            {arrayMaterial.map(m => (
              <li key={m.id}>{m.name}: {m.stockQuantity} unid.</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Ranking de Produção (Melhor Lucro)</h2>
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço Un.</th>
                <th>Pode Produzir</th>
                <th>Lucro Potencial</th>
              </tr>
            </thead>
            <tbody>
              {rankingList.map(p => (
                <tr key={p.id} style={{ backgroundColor: p.possibleQuantity > 0 ? 'transparent' : '#ffebee' }}>
                  <td>{p.name}</td>
                  <td>R$ {p.price.toFixed(2)}</td>
                  <td><strong>{p.possibleQuantity}</strong></td>
                  <td>R$ {p.potentialProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
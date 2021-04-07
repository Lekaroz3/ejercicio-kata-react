import { render } from '@testing-library/react';
import { parse } from 'node:path';
import React, { useEffect, useState } from 'react';
import { ICiudad, IPescado } from './Interfaces/Interfaces';

const CIUDADES:ICiudad[] = [
{
  nombreCiudad: "MADRID",
  preciosPescados: 
      {
          vieiras: 500,
          pulpo: 0,
          centollo: 450
      }
  ,
  distanciaKm: 800
},
{
  nombreCiudad: "BARCELONA",
  preciosPescados: 
      {
          vieiras: 450,
          pulpo: 120,
          centollo: 0
      }
  ,
  distanciaKm: 1100
},
{
  nombreCiudad: "LISBOA",
  preciosPescados: 
      {
          vieiras: 600,
          pulpo: 100,
          centollo: 500
      }
  ,
  distanciaKm: 600
}
]


export const FormularioKata = () => {

const [cantidadVieiras, setCantidadVieiras] = useState(0)
const [cantidadPulpo, setCantidadPulpo] = useState(0)
const [cantidadCentollo, setCantidadCentollo] = useState(0)
const [isWithValue, setIsValue] = useState(false)

useEffect(()=>{
  if(isWithValue){
    let pescados: IPescado[] = [{
      nombrePescado: "vieiras",
      cantidad: cantidadVieiras
    },
  {
      nombrePescado: "pulpos",
      cantidad: cantidadPulpo
  },
  {
      nombrePescado: "centollos",
      cantidad: cantidadCentollo
  }
  
  ];
  let respuestaMejorDestino:string = obtenerMejorDestino(pescados)
  
  alert(respuestaMejorDestino)
  setIsValue(false)
  }
  
},[isWithValue])


  function obtenerMejorDestino(listaPescados:IPescado[]){

      let pesoTotalPescados: number = 0;
  
      listaPescados.forEach(function(a){pesoTotalPescados += a.cantidad;});

      if(pesoTotalPescados<0 || pesoTotalPescados>200){
          console.log("Error, la furgoneta solamente puede llevar 200kg y la suma del peso tiene que ser positivo!");
          return "Error, la furgoneta solamente puede llevar 200kg y la suma del peso tiene que ser positivo!";
      }
  
      let beneficios: {nombreCiudad:string, beneficioTotal:number}[] = [
          {
              nombreCiudad:"madrid",
              beneficioTotal: 0
          },
          {
              nombreCiudad:"barcelona",
              beneficioTotal: 0
          },
          {
              nombreCiudad:"lisboa",
              beneficioTotal: 0
          }
  
      ];
  
      listaPescados.forEach(pesc => {
          CIUDADES.forEach(ciudad => {
            
            if(pesc.nombrePescado === "vieiras"){
              beneficios.filter(ben => ben.nombreCiudad ===ciudad.nombreCiudad.toLowerCase())[0].beneficioTotal += ciudad.preciosPescados["vieiras"]*pesc.cantidad;
            } else if(pesc.nombrePescado === "pulpos"){
              beneficios.filter(ben => ben.nombreCiudad ===ciudad.nombreCiudad.toLowerCase())[0].beneficioTotal += ciudad.preciosPescados["pulpo"]*pesc.cantidad;
            } else{
              beneficios.filter(ben => ben.nombreCiudad ===ciudad.nombreCiudad.toLowerCase())[0].beneficioTotal += ciudad.preciosPescados["centollo"]*pesc.cantidad;
            }
            
              // beneficios.filter(ben => ben.nombreCiudad ===ciudad.nombreCiudad.toLowerCase())[0].beneficioTotal += ciudad.preciosPescados[pesc.nombrePescado.toLowerCase()]*pesc.cantidad;
          });
          
      });
  
      CIUDADES.forEach(ciud => {
          let distanciaKm:number = ciud.distanciaKm;
          let depreciacionPescado = 1-(distanciaKm/100)/100;
          let costeFurgo = 5 + distanciaKm*2;
          //beneficios[ciud.ciudad.toLowerCase()] = beneficios[ciud.ciudad.toLowerCase()]*depreciacion - costeFurgo;
  
          let beneficioCiudadX:any = beneficios.filter(ben => ben.nombreCiudad ===ciud.nombreCiudad.toLowerCase())[0];
          beneficios.filter(ben => ben.nombreCiudad ===ciud.nombreCiudad.toLowerCase())[0].beneficioTotal = beneficioCiudadX.beneficioTotal*depreciacionPescado - costeFurgo;
      });
  
  
  
      beneficios.sort((a,b)=>{
          if(a.beneficioTotal>b.beneficioTotal){return -1}
          return a.beneficioTotal < b.beneficioTotal ?1:0;
      });
  
      let respuestaMejorDestino:string = ``;
  
      beneficios.forEach(ben => {
          respuestaMejorDestino += `Si vas a ${ben.nombreCiudad} tendrias el beneficio de ${ben.beneficioTotal} € \n`
      }); 
  
      respuestaMejorDestino+= beneficios[0].beneficioTotal>=0?`\n\nVete ${beneficios[0].nombreCiudad} que es donde mas vas a ganar!`:`\n\nVete ${beneficios[0].nombreCiudad} que es donde menos vas a perder!`;
  
      return respuestaMejorDestino
  }




function handleSubmit(event:any){
    event.preventDefault()

  
    setCantidadVieiras(parseFloat(event.target.elements.vieiras.value))
    setCantidadPulpo(parseFloat(event.target.elements.pulpos.value))
    setCantidadCentollo(parseFloat(event.target.elements.centollos.value))

    setIsValue(true)
    
    
  event.target.elements.vieiras.value = 0
  event.target.elements.pulpos.value = 0
  event.target.elements.centollos.value = 0
  
  /*
  setVieiras(0)
  setPulpo(0)
  setCentollo(0)
*/     
}



return (
  
  <div className="container mt-5">
  <form onSubmit={handleSubmit}>
      
    <div className="mb-3 row">
      <label htmlFor="vieiras" className="col-sm-2 col-form-label ">Vieiras</label>
      <div className="col-sm-10">
      <input type="text" name="vieiras" id="vieiras" className="form-control" defaultValue="0"/>
      </div>
    </div>

    <div className="mb-3 row">
      <label htmlFor="pulpos" className="col-sm-2 col-form-label">Pulpos</label>
      <div className="col-sm-10">
      <input type="text" name="pulpos" id="pulpos" className="form-control" defaultValue="0"/>
      </div>
    </div>

    <div className="mb-3 row"> 
      <label htmlFor="centollos" className="col-sm-2 col-form-label">Centollos</label>
      <div className="col-sm-10">
      <input type="text" name="centollos" id="centollos" className="form-control" defaultValue="0"/>
      </div>
    </div>

    <button type="submit" className="btn btn-primary">Ver resultado</button>
    
  </form>
  </div>
);
}


import React, { useEffect, useState } from "react";
import { Ciudad, Pescado } from "./Interfaces/Interfaces";

const CIUDADES: Ciudad[] = [
  {
    nombreCiudad: "MADRID",
    preciosPescados: {
      vieiras: 500,
      pulpo: 0,
      centollo: 450,
    },
    distanciaKm: 800,
  },
  {
    nombreCiudad: "BARCELONA",
    preciosPescados: {
      vieiras: 450,
      pulpo: 120,
      centollo: 0,
    },
    distanciaKm: 1100,
  },
  {
    nombreCiudad: "LISBOA",
    preciosPescados: {
      vieiras: 600,
      pulpo: 100,
      centollo: 500,
    },
    distanciaKm: 600,
  },
];

export const FormularioKata = () => {
  const [cantidadPescados, setCantidadPescados] = React.useState({
    cantidadVieiras: 0,
    cantidadPulpo: 0,
    cantidadCentollo: 0,
  });
  const { cantidadVieiras, cantidadPulpo, cantidadCentollo } = cantidadPescados;

  const [error, setError] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  let pescados: Pescado[] = [
    {
      nombrePescado: "vieiras",
      cantidad: cantidadVieiras,
    },
    {
      nombrePescado: "pulpos",
      cantidad: cantidadPulpo,
    },
    {
      nombrePescado: "centollos",
      cantidad: cantidadCentollo,
    },
  ];

  //Cada vez que cambien los valores calcule la mejor opcion
  useEffect(() => {
    obtenerMejorDestino(pescados);
  }, [cantidadPescados]);

  function obtenerMejorDestino(listaPescados: Pescado[]) {
    
    setError(false);

    let pesoTotalPescados: number = calcularPesoTotalPescados(listaPescados);    

    if (pesoTotalPescados < 0 || pesoTotalPescados > 200) {
      setError(true);
      setRespuesta(
        "Error, la furgoneta solamente puede llevar 200kg y la suma del peso tiene que ser positivo!"
      );
      return;
    }

    let beneficios: { nombreCiudad: string; beneficioTotal: number }[] = [
      {
        nombreCiudad: "madrid",
        beneficioTotal: 0,
      },
      {
        nombreCiudad: "barcelona",
        beneficioTotal: 0,
      },
      {
        nombreCiudad: "lisboa",
        beneficioTotal: 0,
      },
    ];

    

    beneficios = calcularIngresosPorCadaCiudad(
      listaPescados,
      CIUDADES,
      beneficios
    );

    beneficios = calcularBeneficioTotal(CIUDADES, beneficios);

    beneficios = ordenarPorMayorBeneficio(beneficios);

    let respuestaMejorDestino: string = crearMensajeRespuesta(beneficios);

    
    setRespuesta(respuestaMejorDestino);
    return;
  }

  function calcularPesoTotalPescados(listaPescados:Pescado[]){
    let pesoTotalPescados:number = 0
    listaPescados.forEach(function (a) {
      pesoTotalPescados += a.cantidad;
    });
    return pesoTotalPescados
  }

  function calcularIngresosPorCadaCiudad(
    listaPescados: Pescado[],
    CIUDADES: Ciudad[],
    beneficios: any[]
  ) {
    listaPescados.forEach((pesc) => {
      CIUDADES.forEach((ciudad) => {
        if (pesc.nombrePescado === "vieiras") {
          beneficios.filter(
            (ben) => ben.nombreCiudad === ciudad.nombreCiudad.toLowerCase()
          )[0].beneficioTotal +=
            ciudad.preciosPescados["vieiras"] * pesc.cantidad;
        } else if (pesc.nombrePescado === "pulpos") {
          beneficios.filter(
            (ben) => ben.nombreCiudad === ciudad.nombreCiudad.toLowerCase()
          )[0].beneficioTotal +=
            ciudad.preciosPescados["pulpo"] * pesc.cantidad;
        } else {
          beneficios.filter(
            (ben) => ben.nombreCiudad === ciudad.nombreCiudad.toLowerCase()
          )[0].beneficioTotal +=
            ciudad.preciosPescados["centollo"] * pesc.cantidad;
        }
      });
    });

    return beneficios;
  }

  function calcularBeneficioTotal(CIUDADES: Ciudad[], beneficios: any[]) {
    CIUDADES.forEach((ciud) => {
      let distanciaKm: number = ciud.distanciaKm;
      let depreciacionPescado = 1 - distanciaKm / 100 / 100;
      let costeFurgoneta = 5 + distanciaKm * 2;

      let beneficioCiudadX: any = beneficios.filter(
        (ben) => ben.nombreCiudad === ciud.nombreCiudad.toLowerCase()
      )[0];
      beneficios.filter(
        (ben) => ben.nombreCiudad === ciud.nombreCiudad.toLowerCase()
      )[0].beneficioTotal =
        beneficioCiudadX.beneficioTotal * depreciacionPescado - costeFurgoneta;
    });
    return beneficios;
  }

  function ordenarPorMayorBeneficio(beneficios: any[]) {
    beneficios.sort((a, b) => {
      if (a.beneficioTotal > b.beneficioTotal) {
        return -1;
      }
      return a.beneficioTotal < b.beneficioTotal ? 1 : 0;
    });
    return beneficios;
  }

  function crearMensajeRespuesta(beneficios:any[]){
    let respuestaMejorDestino:string = ''
    beneficios.forEach((ben) => {
      respuestaMejorDestino += `Si vas a ${ben.nombreCiudad} tendrias el beneficio de ${ben.beneficioTotal.toFixed(2)} € \n`;
    });

    respuestaMejorDestino +=
      beneficios[0].beneficioTotal >= 0
        ? `\n\nVete ${beneficios[0].nombreCiudad} que es donde mas vas a ganar!`
        : `\n\nVete ${beneficios[0].nombreCiudad} que es donde menos vas a perder!`;

    return respuestaMejorDestino
  }

  

  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3 row">
          <label htmlFor="vieiras" className="col-sm-2 col-form-label ">
            Vieiras
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="vieiras"
              id="vieiras"
              className="form-control"
              value={cantidadVieiras}
              onChange={(event) =>
                setCantidadPescados({
                  cantidadVieiras: parseFloat(event.target.value),
                  cantidadPulpo: cantidadPulpo,
                  cantidadCentollo: cantidadCentollo,
                })
              }
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="pulpos" className="col-sm-2 col-form-label">
            Pulpos
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="pulpos"
              id="pulpos"
              className="form-control"
              value={cantidadPulpo}
              onChange={(event) =>
                setCantidadPescados({
                  cantidadVieiras: cantidadVieiras,
                  cantidadPulpo: parseFloat(event.target.value),
                  cantidadCentollo: cantidadCentollo,
                })
              }
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="centollos" className="col-sm-2 col-form-label">
            Centollos
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="centollos"
              id="centollos"
              className="form-control"
              value={cantidadCentollo}
              onChange={(event) =>
                setCantidadPescados({
                  cantidadVieiras: cantidadVieiras,
                  cantidadPulpo: cantidadPulpo,
                  cantidadCentollo: parseFloat(event.target.value),
                })
              }
            />
          </div>
        </div>
        <div style={error ? { color: "red" } : { color: "black" }}>
          {respuesta}
        </div>
      </form>
    </div>
  );
};

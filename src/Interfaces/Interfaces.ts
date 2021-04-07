
export interface ICiudad{
    nombreCiudad: string,
    preciosPescados:{
        vieiras:number,
        pulpo:number, 
        centollo:number
    },
     distanciaKm:number
}

export interface IPescado{
    nombrePescado:string,
    cantidad:number
}

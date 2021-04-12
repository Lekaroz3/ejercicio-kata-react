
export interface Ciudad{
    nombreCiudad: string,
    preciosPescados:{
        vieiras:number,
        pulpo:number, 
        centollo:number
    },
     distanciaKm:number
}

export interface Pescado{
    nombrePescado:string,
    cantidad:number
}

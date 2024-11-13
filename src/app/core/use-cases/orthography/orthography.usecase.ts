import { environment } from "../../../../environments/environment";
import { OrtthographyResponse } from "../../interfaces/orthography.response";


export const OrthographyUseCase = async (prompt:string)=>{

    try {

        const response = await fetch(`${environment.backendApi}/orthograpy-check`,{
            method: 'POST', // Puedes cambiar a 'POST' u otro método si es necesario
            headers: {
                'Content-Type': 'application/json',
                // Incluye otros encabezados si es necesario, por ejemplo: 'Authorization'
            },
            body:JSON.stringify({prompt})
        })

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json() as OrtthographyResponse ;

        // Asumiendo que la API retorna una lista de errores y un recuento
        return {
            ok: true,
            ...data,
            errors: data.errors || [],
            cantidad_errores: data.errors ? data.errors.length : 0,
            message: "Consulta realizada con éxito"
        };
        
    } catch (error) {

        console.log(error);
        return{
            ok:false,
            errors: [],
            cantidad_errores:0,
            message:"No se pudo realizar la consulta"
        }
        
    }

}










import { environment } from "../../../../environments/environment";
import { ProsConsResponse } from "../../interfaces/proscons.response";



export const ProsConsUseCase = async (prompt:string)=>{

    try {

        const response = await fetch(`${environment.backendApi}/pros-cons-discusser`,{
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

        const data = await response.json() as ProsConsResponse
        // Asumiendo que la API retorna una lista de errores y un recuento
        return {
            ok: true,
            ...data,

     
        };
        
    } catch (error) {

        console.log(error);
        return{
            ok:false,
            role:'',
            content:'No se pudo realizar la consulta',
            refusal:''
        }
        
    }

}










import { environment } from "../../../../environments/environment";
import { ProsConsResponse } from "../../interfaces/proscons.response";



export async function* ProsConsStreamUseCase(prompt:string,abortSignal:AbortSignal){

    try {

        const response = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`,{
            method: 'POST', // Puedes cambiar a 'POST' u otro método si es necesario
            headers: {
                'Content-Type': 'application/json',
                // Incluye otros encabezados si es necesario
            },
            body:JSON.stringify({prompt}),
            signal:abortSignal

        })

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const reader = response.body?.getReader();  // get reader

        if (!reader) {
            throw new Error('No se pudo obtener el reader');
        }

        const decoder = new TextDecoder(); // create a new decoder
        let result = ''; // to store the read results

        while (true) {
            const { done, value } = await reader.read(); // read the stream

            if (done) {
                break;
            }

            const text = decoder.decode(value, { stream: true }); // decode as you read
            result += text; // append the result
            yield result; // yield the result

        }

        return result;





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






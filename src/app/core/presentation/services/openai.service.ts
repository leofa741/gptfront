import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { OrthographyUseCase } from '../../use-cases';
import { ProsConsUseCase } from '../../use-cases/proscons/proscons.usecase';
import { ProsConsStreamUseCase } from '../../use-cases/proscons/proscons-streams.usecase';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
   

    checkOrthography(prompt:string){
        return from(OrthographyUseCase(prompt))
    }

     proscons(prompt:string){
        return from(ProsConsUseCase(prompt))
     }

     prosconsStream(prompt:string,abortSignal:AbortSignal){
        return ProsConsStreamUseCase(prompt,abortSignal)
     }  

    

    
}







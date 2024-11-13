import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gptMessageOrthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent { 
  //@Input({ required:true}) text!:string;
  @Input({required:true}) errors!: string[];
  @Input({required:true}) cantidad_errores!: number;
  @Input({required:true}) message!: string;
}




import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-mi-messages',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './miMessages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiMessagesComponent { 
  @Input({ required:true}) text!:string;
}

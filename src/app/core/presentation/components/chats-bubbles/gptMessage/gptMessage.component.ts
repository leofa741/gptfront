import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';


@Component({
  selector: 'app-gpt-message',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent
  ],
  templateUrl: './gptMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageComponent {
  @Input({ required:true}) text!:string;
 }

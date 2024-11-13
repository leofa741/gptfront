import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces/message.interface';
import { GptMessageOrthographyComponent } from "../../components/chats-bubbles/gptMessageOrthography/gptMessageOrthography.component";
import { MiMessagesComponent } from "../../components/chats-bubbles/miMessages/miMessages.component";
import { TypingLoaderComponent } from "../../components/TypingLoader/TypingLoader.component";
import { TextMessagesBoxComponent } from "../../components/text-boxes/textMessagesBox/textMessagesBox.component";
import { GptMessageComponent } from "../../components/chats-bubbles/gptMessage/gptMessage.component";

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageOrthographyComponent,
    MiMessagesComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
    GptMessageComponent
],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  isTyping = false; // Controlar si el usuario está escribiendo
  public openAiService = inject(OpenAiService) ;
  public messages = signal<Message[]>([]);

  handleMessage(prompt: string) {
    this.messages.update((prev) =>[
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ])
    this.isTyping = false; // Dejar de escribir cuando se envía el mensaje

    this.openAiService.proscons(prompt)
    .subscribe(resp =>  {
      console.log(resp),

      this.messages.update((prev) =>[
        ...prev,
        {
          isGpt:true,
          text:resp.content,
          
        }
      ])
    })


  }

  onTyping(event: any) {
    this.isTyping = event.target.value.length > 0; // Detectar si hay texto en el input
  }
 }

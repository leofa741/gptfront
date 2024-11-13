import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent } from '../../components/chats-bubbles/gptMessage/gptMessage.component';
import { MiMessagesComponent } from '../../components/chats-bubbles/miMessages/miMessages.component';
import { TypingLoaderComponent } from '../../components/TypingLoader/TypingLoader.component';
import { TextMessagesBoxComponent } from '../../components/text-boxes/textMessagesBox/textMessagesBox.component';
import { TextMessageBoxFileComponent } from '../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import {  TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '../../../interfaces/message.interface';
import { OpenAiService } from '../../services/openai.service';
import { GptMessageOrthographyComponent } from '../../components/chats-bubbles/gptMessageOrthography/gptMessageOrthography.component';


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageOrthographyComponent,
    MiMessagesComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService)


  isTyping = false; // Controlar si el usuario está escribiendo

  handleMessage(prompt: string) {
    console.log({ prompt });

    this.messages.update((prev) =>[
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ])

    this.isTyping = false; // Dejar de escribir cuando se envía el mensaje

    this.openAiService.checkOrthography(prompt)
    .subscribe(resp =>  {
      console.log(resp),

      this.messages.update((prev) =>[
        ...prev,
        {
          isGpt:true,
          text:resp.message,         
          info:resp,            
        }       
      ])
    
    })
  }

  onTyping(event: any) {
    this.isTyping = event.target.value.length > 0; // Detectar si hay texto en el input
  }

}


  // handleMessageWithFile({ prompt, file }: TextMessageEvent) {
  //   console.log({ prompt, file })
  //   this.isTyping = false;
  // }


  // handleMessageWithSelect(event: TextMessageBoxEvent) {
  //   console.log({ event });
  // }

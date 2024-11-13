import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TextMessageEvent } from '../../presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { OpenAiService } from '../../presentation/services/openai.service';
import { Message } from '../../interfaces/message.interface';
import { TypingLoaderComponent } from "../../presentation/components/TypingLoader/TypingLoader.component";
import { GptMessageComponent } from "../../presentation/components/chats-bubbles/gptMessage/gptMessage.component";
import { MiMessagesComponent } from "../../presentation/components/chats-bubbles/miMessages/miMessages.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypingLoaderComponent,
    GptMessageComponent,
    MiMessagesComponent,
    TextMessageBoxSelectComponent
],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  
  public messages= signal<Message[]>([{text:"holas",isGpt:true}]);
  public isLoading= signal(false);
  public openAiService=inject(OpenAiService)

  
handleMessageWithSelect(event: TextMessageBoxEvent) {
  console.log({ event });
}


  isTyping = false; // Controlar si el usuario está escribiendo

  handleMessage(texto: string) {
    console.log({ texto });
    this.isTyping = false; // Dejar de escribir cuando se envía el mensaje
  }

  handleMessageWithFile({prompt,file}: TextMessageEvent) {
  console.log({prompt,file})
  this.isTyping = false;
    }

  onTyping(event: any) {
    this.isTyping = event.target.value.length > 0; // Detectar si hay texto en el input
  }


 }

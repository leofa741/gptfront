import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';
import { OpenAiService } from '../../services/openai.service';
import { TextMessagesBoxComponent } from "../../components/text-boxes/textMessagesBox/textMessagesBox.component";
import { TypingLoaderComponent } from "../../components/TypingLoader/TypingLoader.component";
import { MiMessagesComponent } from "../../components/chats-bubbles/miMessages/miMessages.component";
import { GptMessageOrthographyComponent } from "../../components/chats-bubbles/gptMessageOrthography/gptMessageOrthography.component";
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessagesBoxComponent,
    TypingLoaderComponent,
    MiMessagesComponent,
    GptMessageOrthographyComponent,
    TextMessageBoxSelectComponent
],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService)


  isTyping = false; // Controlar si el usuario está escribiendo

   handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log({ event });
  }

  onTyping(event: any) {
    this.isTyping = event.target.value.length > 0; // Detectar si hay texto en el input
  }


 }

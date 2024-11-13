import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces/message.interface';
import { GptMessageComponent } from "../../components/chats-bubbles/gptMessage/gptMessage.component";
import { MiMessagesComponent } from "../../components/chats-bubbles/miMessages/miMessages.component";
import { TypingLoaderComponent } from "../../components/TypingLoader/TypingLoader.component";
import { TextMessagesBoxComponent } from "../../components/text-boxes/textMessagesBox/textMessagesBox.component";

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MiMessagesComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  @ViewChild('chatMessages') private chatMessages!: ElementRef<HTMLDivElement>;

  isTyping = false;
  public openAiService = inject(OpenAiService);
  public messages = signal<Message[]>([]);
  private abortController: AbortController | null = null;

  constructor() {
    this.loadMessages(); // Cargar mensajes al iniciar
  }

  async handleMessage(prompt: string) {
    // Cancelar cualquier stream anterior antes de iniciar uno nuevo
    if (this.abortController) {
      this.abortController.abort();
    }

    // Crear un nuevo AbortController para la operación actual
    this.abortController = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: "Espera un momento mientras analizo tu mensaje..."
      }
    ]);
    this.isTyping = false;

    const stream = this.openAiService.prosconsStream(prompt, this.abortController.signal);

    try {
      for await (const message of stream) {
        await this.handleStreamResponseWithDelay(message);
        this.scrollToBottom();  // Asegura el scroll después de cada mensaje nuevo
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Stream cancelado');
      }
    } finally {
      this.saveMessages(); // Guardar mensajes después de finalizar el stream
      this.abortController = null; // Limpiar el controlador después de completar el stream
    }
  }

  async handleStreamResponseWithDelay(response: string) {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    this.messages().pop();
    const message = this.messages();
    this.messages.set([...message, {
      isGpt: true,
      text: response
    }]);

    this.saveMessages(); // Guardar mensajes después de cada respuesta

    await delay(200); // Controlar la velocidad de carga; 500ms es el tiempo de retraso entre cada mensaje
  }

  cancelStream() {
    if (this.abortController) {
      this.abortController.abort(); // Cancelar el stream actual
      this.abortController = null;
    }
  }

  scrollToBottom() {
    if (this.chatMessages) {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    }
  }

  onTyping(event: any) {
    this.isTyping = event.target.value.length > 0;
  }

  saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages()));
  }

  loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages.set(JSON.parse(savedMessages));
    }
  }

  clearMessages() {
    this.messages.set([]);
    localStorage.removeItem('chatMessages');
  }

  ngOnDestroy() {
    this.cancelStream(); // Cancelar el stream antes de destruir el componente
  }


}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {

  selectedFile: File | null = null;

  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;
  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [null],
    file: [null, Validators.required],  // Se requiere un archivo
  });

  handleSubmit() {
    if (this.form.invalid) return; // No procede si el formulario es inválido

    const { prompt, file } = this.form.value;  // Obtiene los valores del formulario
    console.log({ prompt, file });

    this.onMessage.emit({ prompt, file: file! });  // Emite el evento con el archivo y el texto
    this.form.reset();  // Resetea el formulario
  }

  onFileSelected(event: any) {
    const file = event.target.files.item(0);  // Obtiene el archivo seleccionado
    console.log({ file });
    this.form.controls.file.setValue(file);  // Establece el archivo en el control del formulario
  }
}

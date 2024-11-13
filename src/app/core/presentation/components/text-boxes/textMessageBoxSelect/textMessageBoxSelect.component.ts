import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface  Options {
  id: string;
  text:string;
}

export interface  TextMessageBoxEvent {
  prompt: string;
  selectedOptions:string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent { 

  @Input () placeholder:string = ""; 
  @Input ({required:true}) options! : Options[] ; 
  @Output () onMessage= new EventEmitter<TextMessageBoxEvent> ;



  public fb =inject (FormBuilder);
  public form=this.fb.group({
    prompt:['',Validators.required],
    selectedOptions:['',Validators.required],
  });
  
 


  handleSubmit(){
    if (this.form.invalid) return;

    const {prompt,selectedOptions}=this.form.value;
    console.log({prompt,selectedOptions});

    this.onMessage.emit({ prompt:prompt!,selectedOptions:selectedOptions!});
    this.form.reset();
}
}

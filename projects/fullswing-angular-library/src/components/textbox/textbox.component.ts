import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
    selector: '[label] [controlName] [parentForm] fs-textbox',
    templateUrl: './textbox.component.html',
    imports: [FormsModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, ValidationMessageComponent]
})
export class TextboxComponent  {
    @Input() label!: string;
    @Input() controlName!: string;
    @Input() parentForm!: FormGroup;
}

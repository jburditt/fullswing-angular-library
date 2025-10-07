import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: '[datePickerFormControl] fs-datepicker',
    templateUrl: './datepicker.component.html',
    imports: [
        FormsModule, ReactiveFormsModule,
        MatDatepickerModule, MatInputModule
    ]
})
export class DatePickerComponent  {
    title = input("Date");
    datePickerFormControl = input.required<FormControl>();
}

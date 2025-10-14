import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MarkdownComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}

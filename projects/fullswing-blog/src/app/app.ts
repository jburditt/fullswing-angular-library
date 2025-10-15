import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogService } from './blog/blog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public blogService: BlogService) { }
}

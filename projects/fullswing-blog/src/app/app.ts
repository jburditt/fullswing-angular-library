import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogService } from './blog/blog.service';
import { DatePipe } from '@angular/common';
import { CategoryPipe } from './category.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe, CategoryPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public blogService: BlogService) { }
}

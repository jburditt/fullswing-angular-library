import { Component, computed, inject, input, OnDestroy, OnInit } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService } from './blog.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RepositoryService } from '../db/db';

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit, OnDestroy {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor(private http: HttpClient, private blogService: BlogService, private repositoryService: RepositoryService) {

  }

  ngOnInit(): void {
    const route = `/blog/${this.id()}`;
    const blog = this.repositoryService.getBlog(route);
    this.blogService.setBlog(blog);
  }
}

import { Component, computed, input, OnInit } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { marked } from 'marked';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService } from './blog.service';
import { RepositoryService } from '../db/db';

marked.use({
 extensions: [{
    name: 'code',
    renderer(token: any) {
      //return JSON.stringify(token);
      const lang = token.lang;
      const text = token.text;
      const escaped = true;//token.escaped;
      const args = lang.split(" ");
      console.log("args", args);
      let attributes = "";
      let lineNumbers = false;

      for (let arg of args) {
        console.log("arg", arg);
        if (arg.indexOf("=") > 0) {
          const equation = arg.split("=");
          if (equation[0] == "line") {
            attributes += ' data-line=' + equation[1];
            console.log("line", attributes);
            lineNumbers = true;
          } else if (equation[0] == "lineOffset") {
            lineNumbers = true;
          }
        } else if (arg == "lineNumbers") {
          lineNumbers = true;
        }
      }

      let langString = (lang || '').match(/^\S*/)?.[0];
      if (langString)
        langString = ' class="language-' + escape(langString) + '"'
      else
        langString = '';

      const code = text.replace(/\n$/, '') + '\n';

      return '<pre data-line="2" data-line-offset="3"' + (lineNumbers ? ' class="line-numbers"' : '') + '><code' + langString + '>'
        + code
        + '</code></pre>\n' as any;
    }
  }]
})

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor(private blogService: BlogService, private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    const route = `/blog/${this.id()}`;
    const blog = this.repositoryService.getBlog(route);
    this.blogService.setBlog(blog);
  }
}

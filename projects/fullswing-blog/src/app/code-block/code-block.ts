import { Component, computed, contentChild, Directive, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fs-code',
  imports: [MarkdownComponent, MatExpansionModule],
  preserveWhitespaces: true,
  template: `
    @if (title()) {
      <h3>{{ title() }}</h3>
    }
    <markdown [lineNumbers]="lineNumbersEnabled()" [lineHighlight]="lineHighlightEnabled()" clipboard ngPreserveWhitespaces ngNonBindable [line]="line()" [lineOffset]="lineOffset()" [src]="src()" [data]="contentSource" />
    <pre class="hidden" #contentWrapper>
      <ng-content></ng-content>
    </pre>
  `
})
export class CodeBlockComponent implements OnInit {
  title = input();
  src = input<string>();
  line = input<string>();
  lineOffset = input<number>();
  lineHighlightEnabled = computed(() => !!this.line() || !!this.lineOffset());
  lineNumbersEnabled = computed(() => !this.lineHighlightEnabled());
  content = viewChild.required<ElementRef>('contentWrapper');
  contentSource: string | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //console.log("content", this.content().nativeElement.innerHTML);
    if (!this.src())
      this.contentSource = this.content().nativeElement.innerHTML;
    //console.log("lineNumbersEnabled", this.lineNumbersEnabled());
    //console.log("lineOffset", this.lineOffset());
    //console.log("line", this.line());
    //this.markdownService.reload();
    //let safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.content().nativeElement) as any;
    //console.log("sanitized3", safeHtml['changingThisBreaksApplicationSecurity']);
    //this.contentSource = safeHtml['changingThisBreaksApplicationSecurity'];
  }
}

@Directive({
  selector: '[replaceNewlines]',
})
export class ReplaceNewlinesDirective {
  private el = inject(ElementRef);
  constructor() {
    this.el.nativeElement.innerHTML.replace(/\n/g, '<br/>');
  }
}

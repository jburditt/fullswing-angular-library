import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMarkdown } from 'ngx-markdown';

import { Blog } from './blog';
import { RepositoryService } from '../db/db';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    const mockBlog = { title: 'Test', categories: [], author: 'Test', date: new Date(), route: '/blog/test' };
    const repositoryServiceSpy = jasmine.createSpyObj('RepositoryService', { getBlog: mockBlog });

    await TestBed.configureTestingModule({
      imports: [Blog],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideMarkdown({ loader: HttpClient }),
        { provide: RepositoryService, useValue: repositoryServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

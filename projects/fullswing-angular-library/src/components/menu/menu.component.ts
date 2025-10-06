import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule]
})
export class MenuComponent {
  @Input() items: Array<MenuItem> = [];
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    this.menuTrigger.openMenu();
  }
}

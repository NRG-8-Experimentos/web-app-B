// body.component.ts
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgClass, RouterOutlet, ThemeToggleComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  getBodyClass(): string {
    let styleClass = '';
    if (this.screenWidth === 0) return 'fullscreen';
    if (this.collapsed && this.screenWidth > 768) styleClass = 'body-trimmed';
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) styleClass = 'body-md-screen';
    return styleClass;
  }
}

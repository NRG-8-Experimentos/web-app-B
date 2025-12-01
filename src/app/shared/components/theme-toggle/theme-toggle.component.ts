import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <button class="theme-fab" (click)="toggle()"
            [attr.aria-label]="labelKey | translate"
            [title]="labelKey | translate">
      <span class="material-icons">{{ icon }}</span>
    </button>
  `,
  styles: [`
    .theme-fab{
      position: fixed; bottom: 24px; left: 24px;
      width: 44px; height: 44px; border-radius: 12px;
      border: none; cursor: pointer;
      background: var(--card-bg); color: var(--text);
      box-shadow: var(--elev);
      display: grid; place-items: center;
    }
    .material-icons{ font-size: 22px; }
  `]
})
export class ThemeToggleComponent {
  private theme = inject(ThemeService);
  get icon(){ return this.theme.isDark() ? 'light_mode' : 'dark_mode'; }
  get labelKey(){ return this.theme.isDark() ? 'appearance.themeFab.toLight' : 'appearance.themeFab.toDark'; }
  toggle(){ this.theme.toggle(); }
}

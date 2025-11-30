import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AppearanceService, AppearanceMode } from '@app/shared/services/appearance.service';

@Component({
  selector: 'app-appearance-compact-toggle',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="appearance-card" role="radiogroup"
             [attr.aria-label]="'appearance.title' | translate">

      <h3 class="appearance-title">{{ 'appearance.title' | translate }}</h3>

      <div class="row">
        <button type="button" class="chip"
                role="radio"
                [attr.aria-checked]="mode() === 'light'"
                [class.is-selected]="mode() === 'light'"
                (click)="set('light')" (keydown.enter)="set('light')" (keydown.space)="set('light')">
          <span class="material-icons chip__icon">light_mode</span>
          <span class="chip__text">{{ 'appearance.light' | translate }}</span>
        </button>

        <button type="button" class="chip"
                role="radio"
                [attr.aria-checked]="mode() === 'dark'"
                [class.is-selected]="mode() === 'dark'"
                (click)="set('dark')" (keydown.enter)="set('dark')" (keydown.space)="set('dark')">
          <span class="material-icons chip__icon">dark_mode</span>
          <span class="chip__text">{{ 'appearance.dark' | translate }}</span>
        </button>
      </div>

      <div class="row row--center">
        <button type="button" class="chip chip--wide"
                role="radio"
                [attr.aria-checked]="mode() === 'auto'"
                [class.is-selected]="mode() === 'auto'"
                (click)="set('auto')" (keydown.enter)="set('auto')" (keydown.space)="set('auto')">
          <span class="material-icons chip__icon">monitor</span>
          <span class="chip__text">{{ 'appearance.system' | translate }}</span>
        </button>
      </div>

    </section>
  `,
  styles: [`

    :host{
      --nav-bg:     var(--sidenav-bg, var(--surface, #0f172a));
      --nav-fg:     var(--sidenav-fg, var(--text, #e5e7eb));
      --nav-border: var(--sidenav-border, var(--border, #273244));
      --brand:      var(--primary, #3b82f6);
      --elev-1:     0 1px 3px rgba(0,0,0,.25);
    }

    .appearance-card{
      background: var(--nav-bg);
      color: var(--nav-fg);
      border: 1px solid var(--nav-border);
      border-radius: 14px;
      padding: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    .appearance-title{
      margin: 0 0 10px 0;
      font-size: .95rem;
      font-weight: 700;
      color: var(--nav-fg);
    }

    .row{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
    }
    .row + .row{ margin-top: 10px; }
    .row--center{ grid-template-columns: 1fr; justify-items: center; }

    .chip{
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 10px 12px; width: 100%;
      border-radius: 12px;
      border: 1px solid var(--nav-border);
      background: color-mix(in oklab, var(--nav-bg) 94%, white 6%);
      color: var(--nav-fg);
      cursor: pointer;
      transition: background .15s ease, box-shadow .15s ease, border-color .15s ease, transform .02s ease;
      box-shadow: 0 0 0 0 transparent;
      text-align: center;
      user-select: none;
    }
    .chip:hover{
      background: color-mix(in oklab, var(--nav-bg) 88%, var(--brand) 12%);
      border-color: color-mix(in oklab, var(--brand) 55%, var(--nav-border));
    }
    .chip:active{ transform: translateY(1px); }

    .chip__icon{ font-size: 18px; line-height: 1; }
    .chip__text{ font-size: .92rem; font-weight: 700; }

    .is-selected{
      border-color: color-mix(in oklab, var(--brand) 70%, var(--nav-border));
      box-shadow: 0 0 0 2px color-mix(in oklab, var(--brand) 28%, transparent) inset;
      background: color-mix(in oklab, var(--brand) 10%, var(--nav-bg));
    }

    .chip--wide{ width: 78%; }

    .effective{
      margin: 10px 4px 0;
      color: color-mix(in oklab, var(--nav-fg) 80%, #9aa4b2);
      font-size: .78rem;
    }


    @media (max-width: 280px){
      .chip__text{ display:none; }
      .chip--wide{ width: 56px; }
      .row{ gap: 6px; }
    }
  `]
})
export class AppearanceCompactToggleComponent {
  private svc = inject(AppearanceService);
  mode = signal<AppearanceMode>(this.svc.getMode());
  effective = signal<'light'|'dark'>(this.svc.getEffective());

  set(next: AppearanceMode){
    if (this.mode() !== next){
      this.svc.setMode(next);
      this.mode.set(next);
      this.effective.set(this.svc.getEffective());
    }
  }
}

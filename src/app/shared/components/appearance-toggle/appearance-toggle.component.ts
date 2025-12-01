import { Component, signal, inject } from '@angular/core';
import { AppearanceService, AppearanceMode } from '@app/shared/services/appearance.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-appearance-toggle',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <section class="card p-3 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--surface)]">
      <h3 class="m-0 mb-2 text-sm">{{ 'appearance.title' | translate }}</h3>

      <div role="radiogroup"
           class="text-sm"
           [attr.aria-label]="'appearance.title' | translate">
        <label class="mr-4">
          <input type="radio"
                 name="appearance"
                 [checked]="mode() === 'light'"
                 (change)="onChange('light')">
          {{ 'appearance.options.light' | translate }}
        </label>

        <label class="mr-4">
          <input type="radio"
                 name="appearance"
                 [checked]="mode() === 'dark'"
                 (change)="onChange('dark')">
          {{ 'appearance.options.dark' | translate }}
        </label>

        <label>
          <input type="radio"
                 name="appearance"
                 [checked]="mode() === 'auto'"
                 (change)="onChange('auto')">
          {{ 'appearance.options.system' | translate }}
          <span class="opacity-70">· {{ 'appearance.autoDesc' | translate }}</span>
        </label>
      </div>

      <p class="text-[var(--muted)] mt-2 text-xs">
        {{ 'appearance.effective.label' | translate }}
        <strong>{{ ('appearance.effective.' + effective()) | translate }}</strong>
      </p>
    </section>
  `
})
export class AppearanceToggleComponent {
  private appearance = inject(AppearanceService);

  mode = signal<AppearanceMode>(this.appearance.getMode());
  effective = signal<'light'|'dark'>(this.appearance.getEffective());

  onChange(next: AppearanceMode) {
    this.appearance.setMode(next);
    this.mode.set(next);
    this.effective.set(this.appearance.getEffective());
  }
}

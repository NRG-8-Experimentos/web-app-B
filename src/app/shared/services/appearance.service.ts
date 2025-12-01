import { Injectable } from '@angular/core';

export type AppearanceMode = 'light'|'dark'|'auto';

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  private readonly KEY = 'appearance';
  private mq = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.apply(this.effective(this.getMode()));
    this.mq.addEventListener?.('change', e => {
      if (this.getMode() === 'auto') this.apply(e.matches ? 'dark' : 'light');
    });
  }

  getMode(): AppearanceMode {
    return (localStorage.getItem(this.KEY) as AppearanceMode) || 'auto';
  }

  setMode(mode: AppearanceMode) {
    localStorage.setItem(this.KEY, mode);
    this.apply(this.effective(mode));
  }

  getEffective(): 'light'|'dark' {
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  private effective(mode: AppearanceMode): 'light'|'dark' {
    return mode === 'light' || mode === 'dark' ? mode : (this.mq.matches ? 'dark' : 'light');
  }

  private apply(eff: 'light'|'dark') {
    const root = document.documentElement as HTMLElement;
    if (eff === 'dark') { root.classList.add('theme-dark'); root.style.colorScheme = 'dark'; }
    else { root.classList.remove('theme-dark'); root.style.colorScheme = 'light'; }
  }
}

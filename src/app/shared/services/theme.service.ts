import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'prefers-dark';

  initFromStorage() {
    const saved = localStorage.getItem(this.KEY);
    const wantsDark = saved ? saved === '1' : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.setDark(wantsDark);
  }

  isDark(): boolean {
    return document.documentElement.classList.contains('dark') || document.documentElement.classList.contains('theme-dark');
  }

  toggle() { this.setDark(!this.isDark()); }

  setDark(on: boolean) {
    const root = document.documentElement;
    root.classList.toggle('dark', on);
    root.classList.toggle('theme-dark', on);
    root.style.colorScheme = on ? 'dark' : 'light';
    localStorage.setItem(this.KEY, on ? '1' : '0');
  }
}

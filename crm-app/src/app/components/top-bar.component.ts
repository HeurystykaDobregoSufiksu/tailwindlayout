import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavButtonComponent, NavButton } from './nav-button.component';
import { IconButtonComponent, IconButtonConfig } from './icon-button.component';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, NavButtonComponent, IconButtonComponent],
  template: `
    <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60">
      <div class="px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between">
          <!-- Left: Mobile Menu Toggle & Navigation -->
          <div class="flex items-center space-x-2">
            <!-- Mobile Menu Toggle -->
            <app-icon-button
              [config]="mobileMenuButton"
              (buttonClick)="onMobileMenuClick()"
              class="lg:hidden">
            </app-icon-button>

            <!-- Navigation Tabs -->
            <nav class="hidden lg:flex space-x-1 overflow-x-auto hide-scrollbar">
              <app-nav-button
                *ngFor="let button of navButtons"
                [button]="button"
                (buttonClick)="onNavButtonClick($event)">
              </app-nav-button>
            </nav>
          </div>

          <!-- Right: Logo & Theme Toggle -->
          <div class="flex items-center space-x-3">
            <!-- Theme Toggle -->
            <app-icon-button
              [config]="themeButton"
              (buttonClick)="onThemeToggle()">
            </app-icon-button>

            <!-- Brand Name -->
            <div class="flex items-center space-x-2">
              <div class="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="hidden sm:block">
                <h1 class="text-base font-bold text-slate-800 dark:text-slate-100">CRM Pro</h1>
                <p class="text-xs text-slate-500 dark:text-slate-400">Zarządzanie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class TopBarComponent {
  @Input() navButtons!: NavButton[];
  @Input() isDarkMode: boolean = false;
  @Input() mobileMenuButton!: IconButtonConfig;
  @Input() themeButton!: IconButtonConfig;

  @Output() navButtonClick = new EventEmitter<NavButton>();
  @Output() mobileMenuClick = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  onNavButtonClick(button: NavButton) {
    this.navButtonClick.emit(button);
  }

  onMobileMenuClick() {
    this.mobileMenuClick.emit();
  }

  onThemeToggle() {
    this.themeToggle.emit();
  }
}

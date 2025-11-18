import { Component, Input, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownVariant = 'primary' | 'secondary' | 'text';
export type DropdownPosition = 'left' | 'right';

@Component({
  selector: 'app-dropdown-button',
  imports: [CommonModule],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.scss'
})
export class DropdownButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() size: DropdownSize = 'md';
  @Input() variant: DropdownVariant = 'primary';
  @Input() position: DropdownPosition = 'right';
  @Input() disabled = false;

  isOpen = signal(false);

  private sanitizer = inject(DomSanitizer);

  private chevronIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';

  get safeIcon(): SafeHtml {
    return this.icon ? this.sanitizer.bypassSecurityTrustHtml(this.icon) : '';
  }

  get safeChevronIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.chevronIcon);
  }

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center gap-2 font-medium transition-colors-base rounded-button';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg'
    };

    const variantClasses = {
      primary: 'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 bg-brand-gradient text-white hover:bg-brand-gradient shadow-button hover:shadow-button-hover',
      secondary: 'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 border bg-white border-slate-200 dark:bg-state-900 dark:border-state-600 text-primary hover:bg-slate-50 dark:hover:bg-slate-800 shadow-button',
      text: 'text-primary hover:font-semibold'
    };

    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${disabledClasses}`;
  }

  get dropdownClasses(): string {
    const positionClasses = {
      left: 'left-0 origin-top-left',
      right: 'right-0 origin-top-right'
    };

    return `absolute mt-2 min-w-[12rem] rounded-card bg-card border border-default shadow-card z-50 ${positionClasses[this.position]}`;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen.set(!this.isOpen());
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-container');

    if (!clickedInside && this.isOpen()) {
      this.closeDropdown();
    }
  }
}

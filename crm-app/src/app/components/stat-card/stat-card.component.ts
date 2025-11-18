import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type StatCardSize = 'sm' | 'md' | 'lg';
export type StatCardVariant = 'default' | 'gradient';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  // Primitive inputs only
  label = input.required<string>();
  value = input.required<string>();
  icon = input<string>('');
  change = input<string>('');
  changePositive = input<boolean>(true);
  size = input<StatCardSize>('md');
  variant = input<StatCardVariant>('default');
  gradient = input<string>(''); // e.g., 'bg-violet-purple', 'bg-blue-gradient', etc.

  // Internal state
  private sanitizer = inject(DomSanitizer);

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  cardClasses = computed<string>(() => {
    const baseClasses = 'rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden';

    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const variantClasses = this.variant() === 'gradient'
      ? `${this.gradient() || 'bg-violet-purple'} text-white`
      : 'bg-white dark:bg-ui-bg-primary-dark border border-ui-border dark:border-ui-border-dark';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses}`;
  });

  iconContainerClasses = computed<string>(() => {
    const baseClasses = 'rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110';

    const sizeClasses = {
      sm: 'size-10',
      md: 'size-12',
      lg: 'size-16'
    };

    const variantClasses = this.variant() === 'gradient'
      ? 'bg-white/20 backdrop-blur-sm'
      : 'bg-brand-primary/10 text-brand-primary';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses}`;
  });

  iconClasses = computed<string>(() => {
    const sizeClasses = {
      sm: 'size-5',
      md: 'size-6',
      lg: 'size-8'
    };

    return sizeClasses[this.size()];
  });

  labelClasses = computed<string>(() => {
    const baseClasses = 'font-medium';

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };

    const variantClasses = this.variant() === 'gradient'
      ? 'text-white/90'
      : 'text-ui-text-secondary dark:text-ui-text-secondary-dark';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses}`;
  });

  valueClasses = computed<string>(() => {
    const baseClasses = 'font-bold';

    const sizeClasses = {
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl'
    };

    const variantClasses = this.variant() === 'gradient'
      ? 'text-white'
      : 'text-ui-text-primary dark:text-ui-text-primary-dark';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses}`;
  });

  changeClasses = computed<string>(() => {
    const baseClasses = 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium';

    if (this.variant() === 'gradient') {
      return `${baseClasses} bg-white/20 text-white`;
    }

    const colorClasses = this.changePositive()
      ? 'bg-status-success-light dark:bg-status-success-dark/30 text-status-success'
      : 'bg-status-error-light dark:bg-status-error-dark/30 text-status-error';

    return `${baseClasses} ${colorClasses}`;
  });

  changeIcon = computed<string>(() => {
    if (this.changePositive()) {
      return `<svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>`;
    } else {
      return `<svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>`;
    }
  });

  safeChangeIcon = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.changeIcon());
  });
}

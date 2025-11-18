import { Component, input, output, signal, computed, effect, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type DialogStatus = 'success' | 'error' | 'warning' | 'info';
export type DialogSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-status-dialog',
  imports: [CommonModule],
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.scss'
})
export class StatusDialogComponent {
  // Primitive inputs only
  isOpen = input<boolean>(false);
  status = input<DialogStatus>('info');
  title = input<string>('');
  message = input<string>('');
  size = input<DialogSize>('md');
  showCloseButton = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  customIcon = input<string>('');

  // Outputs
  dialogClose = output<void>();
  dialogOpen = output<void>();

  // Internal state
  animateIcon = signal<boolean>(false);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    // Trigger icon animation when dialog opens
    effect(() => {
      if (this.isOpen()) {
        this.animateIcon.set(false);
        setTimeout(() => this.animateIcon.set(true), 100);
        this.dialogOpen.emit();
      }
    });

    // Handle escape key
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Computed values
  safeCustomIcon = computed<SafeHtml>(() => {
    const iconHtml = this.customIcon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  statusIcon = computed<string>(() => {
    if (this.customIcon()) {
      return ''; // Will use custom icon instead
    }

    switch (this.status()) {
      case 'success':
        return `<svg class="status-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>`;

      case 'error':
        return `<svg class="status-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>`;

      case 'warning':
        return `<svg class="status-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>`;

      case 'info':
        return `<svg class="status-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`;

      default:
        return '';
    }
  });

  safeStatusIcon = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.statusIcon());
  });

  iconContainerClasses = computed<string>(() => {
    const baseClasses = 'status-icon-container rounded-full flex items-center justify-center mx-auto transition-all duration-300';
    const sizeClasses = this.size() === 'sm' ? 'size-12' : this.size() === 'lg' ? 'size-20' : 'size-16';

    let statusClasses = '';
    switch (this.status()) {
      case 'success':
        statusClasses = 'bg-status-success-light dark:bg-status-success-dark/30 text-status-success';
        break;
      case 'error':
        statusClasses = 'bg-status-error-light dark:bg-status-error-dark/30 text-status-error';
        break;
      case 'warning':
        statusClasses = 'bg-status-warning-light dark:bg-status-warning-dark/30 text-status-warning';
        break;
      case 'info':
        statusClasses = 'bg-status-info-light dark:bg-status-info-dark/30 text-status-info';
        break;
    }

    const animateClasses = this.animateIcon() ? 'scale-100 opacity-100' : 'scale-50 opacity-0';

    return `${baseClasses} ${sizeClasses} ${statusClasses} ${animateClasses}`;
  });

  modalClasses = computed<string>(() => {
    const baseClasses = 'modal-content bg-white dark:bg-ui-bg-primary-dark rounded-xl shadow-2xl transform transition-all duration-300';

    let sizeClasses = '';
    switch (this.size()) {
      case 'sm':
        sizeClasses = 'max-w-sm';
        break;
      case 'lg':
        sizeClasses = 'max-w-2xl';
        break;
      case 'md':
      default:
        sizeClasses = 'max-w-md';
        break;
    }

    const animateClasses = this.animateIcon() ? 'scale-100 opacity-100' : 'scale-95 opacity-0';

    return `${baseClasses} ${sizeClasses} ${animateClasses}`;
  });

  titleClasses = computed<string>(() => {
    const baseClasses = 'font-bold text-ui-text-primary dark:text-ui-text-primary-dark text-center';
    const sizeClasses = this.size() === 'sm' ? 'text-lg' : this.size() === 'lg' ? 'text-3xl' : 'text-2xl';
    return `${baseClasses} ${sizeClasses}`;
  });

  messageClasses = computed<string>(() => {
    const baseClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark text-center';
    const sizeClasses = this.size() === 'sm' ? 'text-sm' : this.size() === 'lg' ? 'text-lg' : 'text-base';
    return `${baseClasses} ${sizeClasses}`;
  });

  closeDialog(): void {
    this.dialogClose.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick() && event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.closeOnEscape() && this.isOpen() && event.key === 'Escape') {
      this.closeDialog();
    }
  }
}

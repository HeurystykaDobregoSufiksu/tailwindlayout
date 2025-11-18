import { Component, input, output, effect, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export type ModalStatus = 'success' | 'error' | 'warning' | 'info';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalButton {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  action: () => void;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-status-modal',
  imports: [CommonModule],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.95) translateY(-10px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('void => *', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('* => void', animate('150ms cubic-bezier(0.4, 0, 1, 1)'))
    ]),
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('200ms ease-out')),
      transition('* => void', animate('150ms ease-in'))
    ])
  ]
})
export class StatusModalComponent {
  // Inputs
  isOpen = input<boolean>(false);
  status = input<ModalStatus>('info');
  title = input.required<string>();
  description = input<string>();
  size = input<ModalSize>('md');
  buttons = input<ModalButton[]>([]);
  showCloseButton = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  customIcon = input<string>();

  // Outputs
  modalClose = output<void>();
  modalOpen = output<void>();

  // Internal state
  animateIcon = signal<boolean>(false);

  constructor() {
    // Trigger icon animation when modal opens
    effect(() => {
      if (this.isOpen()) {
        this.animateIcon.set(false);
        setTimeout(() => this.animateIcon.set(true), 100);
        this.modalOpen.emit();
      }
    });
  }

  /**
   * Get the status icon SVG based on modal status
   */
  getStatusIcon(): string {
    if (this.customIcon()) {
      return this.customIcon()!;
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
  }

  /**
   * Get CSS classes for the status icon container
   */
  getIconContainerClasses(): string {
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

    return `${baseClasses} ${sizeClasses} ${statusClasses}`;
  }

  /**
   * Get CSS classes for modal container
   */
  getModalClasses(): string {
    const baseClasses = 'modal-content bg-ui-bg-primary dark:bg-ui-bg-primary-dark rounded-xl shadow-2xl';

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

    return `${baseClasses} ${sizeClasses}`;
  }

  /**
   * Get CSS classes for title
   */
  getTitleClasses(): string {
    const baseClasses = 'font-bold text-ui-text-primary dark:text-ui-text-primary-dark text-center';
    const sizeClasses = this.size() === 'sm' ? 'text-lg' : this.size() === 'lg' ? 'text-3xl' : 'text-2xl';
    return `${baseClasses} ${sizeClasses}`;
  }

  /**
   * Get CSS classes for description
   */
  getDescriptionClasses(): string {
    const baseClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark text-center';
    const sizeClasses = this.size() === 'sm' ? 'text-sm' : this.size() === 'lg' ? 'text-lg' : 'text-base';
    return `${baseClasses} ${sizeClasses}`;
  }

  /**
   * Get CSS classes for button based on variant
   */
  getButtonClasses(button: ModalButton): string {
    const baseClasses = 'px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    let variantClasses = '';
    switch (button.variant || 'primary') {
      case 'primary':
        variantClasses = 'bg-brand-primary hover:bg-brand-primary-dark text-white shadow-sm hover:shadow-md';
        break;
      case 'secondary':
        variantClasses = 'bg-ui-bg-tertiary dark:bg-ui-bg-tertiary-dark hover:bg-ui-border dark:hover:bg-ui-border-dark text-ui-text-primary dark:text-ui-text-primary-dark';
        break;
      case 'outline':
        variantClasses = 'border-2 border-ui-border dark:border-ui-border-dark hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark text-ui-text-primary dark:text-ui-text-primary-dark';
        break;
      case 'ghost':
        variantClasses = 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark text-ui-text-secondary dark:text-ui-text-secondary-dark';
        break;
    }

    return `${baseClasses} ${variantClasses}`;
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.modalClose.emit();
  }

  /**
   * Handle backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick() && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  /**
   * Handle button click
   */
  onButtonClick(button: ModalButton): void {
    if (!button.disabled) {
      button.action();
    }
  }

  /**
   * Handle escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen() && this.closeOnEscape()) {
      this.closeModal();
    }
  }

  /**
   * Prevent body scroll when modal is open
   */
  @HostListener('window:load')
  ngOnInit(): void {
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
}

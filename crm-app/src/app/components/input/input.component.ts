import { Component, input, output, signal, effect, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'success' | 'warning' | 'error';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface ButtonConfig {
  icon: string;
  label?: string;
  ariaLabel?: string;
}

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Inputs
  label = input<string>('');
  hiddenLabel = input<boolean>(false);
  cornerHint = input<string>('');
  placeholder = input<string>('');
  helpText = input<string>('');
  errorMessage = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  type = input<InputType>('text');
  size = input<InputSize>('md');
  variant = input<InputVariant>('default');

  // Leading and trailing add-ons
  leadingAddon = input<string>('');
  leadingIcon = input<string>('');
  leadingDropdown = input<DropdownOption[]>([]);
  trailingAddon = input<string>('');
  trailingIcon = input<string>('');
  trailingDropdown = input<DropdownOption[]>([]);
  trailingButton = input<ButtonConfig | null>(null);

  // Input attributes
  name = input<string>('');
  id = input<string>('');
  autocomplete = input<string>('');
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>('');

  // Outputs
  valueChange = output<string>();
  inputFocus = output<void>();
  inputBlur = output<void>();
  leadingDropdownSelect = output<DropdownOption>();
  trailingDropdownSelect = output<DropdownOption>();
  buttonClick = output<void>();

  // Internal state
  value = signal<string>('');
  isFocused = signal<boolean>(false);
  isLeadingDropdownOpen = signal<boolean>(false);
  isTrailingDropdownOpen = signal<boolean>(false);
  selectedLeadingDropdownOption = signal<DropdownOption | null>(null);
  selectedTrailingDropdownOption = signal<DropdownOption | null>(null);

  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Auto-select first dropdown option if available
    effect(() => {
      const leadingOptions = this.leadingDropdown();
      if (leadingOptions.length > 0 && !this.selectedLeadingDropdownOption()) {
        this.selectedLeadingDropdownOption.set(leadingOptions[0]);
      }
    });

    effect(() => {
      const trailingOptions = this.trailingDropdown();
      if (trailingOptions.length > 0 && !this.selectedTrailingDropdownOption()) {
        this.selectedTrailingDropdownOption.set(trailingOptions[0]);
      }
    });
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is handled by input signal
  }

  /**
   * Handle input value change
   */
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Handle input focus
   */
  onFocus(): void {
    this.isFocused.set(true);
    this.inputFocus.emit();
  }

  /**
   * Handle input blur
   */
  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
    this.inputBlur.emit();
  }

  /**
   * Toggle leading dropdown visibility
   */
  toggleLeadingDropdown(): void {
    if (!this.disabled()) {
      this.isLeadingDropdownOpen.set(!this.isLeadingDropdownOpen());
      this.isTrailingDropdownOpen.set(false);
    }
  }

  /**
   * Toggle trailing dropdown visibility
   */
  toggleTrailingDropdown(): void {
    if (!this.disabled()) {
      this.isTrailingDropdownOpen.set(!this.isTrailingDropdownOpen());
      this.isLeadingDropdownOpen.set(false);
    }
  }

  /**
   * Select leading dropdown option
   */
  selectLeadingDropdownOption(option: DropdownOption): void {
    this.selectedLeadingDropdownOption.set(option);
    this.isLeadingDropdownOpen.set(false);
    this.leadingDropdownSelect.emit(option);
  }

  /**
   * Select trailing dropdown option
   */
  selectTrailingDropdownOption(option: DropdownOption): void {
    this.selectedTrailingDropdownOption.set(option);
    this.isTrailingDropdownOpen.set(false);
    this.trailingDropdownSelect.emit(option);
  }

  /**
   * Handle trailing button click
   */
  onButtonClick(): void {
    if (!this.disabled()) {
      this.buttonClick.emit();
    }
  }

  /**
   * Get input container classes
   */
  getContainerClasses(): string {
    return 'input-container w-full';
  }

  /**
   * Get label classes
   */
  getLabelClasses(): string {
    const baseClasses = 'block text-sm font-medium mb-1.5 transition-colors';
    const colorClasses = this.getVariantTextColor();
    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${colorClasses} ${disabledClasses}`;
  }

  /**
   * Get input wrapper classes (includes leading/trailing addons)
   */
  getInputWrapperClasses(): string {
    const baseClasses = 'relative flex items-center rounded-input transition-all duration-200';
    const focusClasses = this.isFocused() && !this.disabled() ? this.getFocusRingClasses() : '';
    const borderClasses = this.getBorderClasses();
    const bgClasses = this.disabled()
      ? 'bg-ui-bg-tertiary dark:bg-ui-bg-tertiary-dark'
      : 'bg-ui-bg-primary dark:bg-ui-bg-primary-dark';

    return `${baseClasses} ${borderClasses} ${bgClasses} ${focusClasses}`;
  }

  /**
   * Get input field classes
   */
  getInputClasses(): string {
    const baseClasses = 'flex-1 outline-none bg-transparent transition-colors';
    const sizeClasses = this.getSizeClasses();
    const textColor = this.disabled()
      ? 'text-ui-text-muted dark:text-ui-text-muted-dark'
      : 'text-ui-text-primary dark:text-ui-text-primary-dark';
    const placeholderClasses = 'placeholder:text-ui-text-muted dark:placeholder:text-ui-text-muted-dark';
    const disabledClasses = this.disabled() ? 'cursor-not-allowed' : '';
    const paddingClasses = this.getPaddingClasses();

    return `${baseClasses} ${sizeClasses} ${textColor} ${placeholderClasses} ${disabledClasses} ${paddingClasses}`;
  }

  /**
   * Get size-specific classes
   */
  getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'md':
      default:
        return 'text-base';
    }
  }

  /**
   * Get padding classes based on addons
   */
  getPaddingClasses(): string {
    const hasLeading = this.leadingAddon() || this.leadingIcon() || this.leadingDropdown().length > 0;
    const hasTrailing = this.trailingAddon() || this.trailingIcon() || this.trailingDropdown().length > 0 || this.trailingButton();

    let padding = '';

    switch (this.size()) {
      case 'sm':
        padding = hasLeading ? 'pl-2' : 'pl-3';
        padding += hasTrailing ? ' pr-2' : ' pr-3';
        padding += ' py-2';
        break;
      case 'lg':
        padding = hasLeading ? 'pl-3' : 'pl-4';
        padding += hasTrailing ? ' pr-3' : ' pr-4';
        padding += ' py-3.5';
        break;
      case 'md':
      default:
        padding = hasLeading ? 'pl-2.5' : 'pl-3.5';
        padding += hasTrailing ? ' pr-2.5' : ' pr-3.5';
        padding += ' py-2.5';
        break;
    }

    return padding;
  }

  /**
   * Get border classes based on variant and state
   */
  getBorderClasses(): string {
    const baseClasses = 'border-2';

    if (this.disabled()) {
      return `${baseClasses} border-ui-border dark:border-ui-border-dark`;
    }

    switch (this.variant()) {
      case 'error':
        return `${baseClasses} border-status-error`;
      case 'warning':
        return `${baseClasses} border-status-warning`;
      case 'success':
        return `${baseClasses} border-status-success`;
      case 'default':
      default:
        return this.isFocused()
          ? `${baseClasses} border-brand-primary`
          : `${baseClasses} border-ui-border dark:border-ui-border-dark hover:border-ui-border-strong dark:hover:border-ui-border-strong-dark`;
    }
  }

  /**
   * Get focus ring classes
   */
  getFocusRingClasses(): string {
    switch (this.variant()) {
      case 'error':
        return 'ring-2 ring-status-error/20';
      case 'warning':
        return 'ring-2 ring-status-warning/20';
      case 'success':
        return 'ring-2 ring-status-success/20';
      case 'default':
      default:
        return 'ring-2 ring-brand-primary/20';
    }
  }

  /**
   * Get variant text color
   */
  getVariantTextColor(): string {
    switch (this.variant()) {
      case 'error':
        return 'text-status-error';
      case 'warning':
        return 'text-status-warning';
      case 'success':
        return 'text-status-success';
      case 'default':
      default:
        return 'text-ui-text-primary dark:text-ui-text-primary-dark';
    }
  }

  /**
   * Get help text classes
   */
  getHelpTextClasses(): string {
    const baseClasses = 'mt-1.5 text-sm';
    const colorClasses = this.disabled()
      ? 'text-ui-text-muted dark:text-ui-text-muted-dark opacity-50'
      : 'text-ui-text-secondary dark:text-ui-text-secondary-dark';

    return `${baseClasses} ${colorClasses}`;
  }

  /**
   * Get error message classes
   */
  getErrorMessageClasses(): string {
    return 'mt-1.5 text-sm text-status-error flex items-center gap-1.5';
  }

  /**
   * Get leading addon classes
   */
  getLeadingAddonClasses(): string {
    const baseClasses = 'flex items-center px-3 text-ui-text-secondary dark:text-ui-text-secondary-dark border-r-2 border-ui-border dark:border-ui-border-dark';
    const sizeClasses = this.size() === 'sm' ? 'text-sm' : this.size() === 'lg' ? 'text-lg' : 'text-base';
    const disabledClasses = this.disabled() ? 'opacity-50' : '';

    return `${baseClasses} ${sizeClasses} ${disabledClasses}`;
  }

  /**
   * Get trailing addon classes
   */
  getTrailingAddonClasses(): string {
    const baseClasses = 'flex items-center px-3 text-ui-text-secondary dark:text-ui-text-secondary-dark border-l-2 border-ui-border dark:border-ui-border-dark';
    const sizeClasses = this.size() === 'sm' ? 'text-sm' : this.size() === 'lg' ? 'text-lg' : 'text-base';
    const disabledClasses = this.disabled() ? 'opacity-50' : '';

    return `${baseClasses} ${sizeClasses} ${disabledClasses}`;
  }

  /**
   * Get icon classes
   */
  getIconClasses(): string {
    const baseClasses = 'flex items-center justify-center text-ui-text-muted dark:text-ui-text-muted-dark';
    const sizeClasses = this.size() === 'sm' ? 'size-4 mx-2' : this.size() === 'lg' ? 'size-6 mx-3' : 'size-5 mx-2.5';
    const disabledClasses = this.disabled() ? 'opacity-50' : '';

    return `${baseClasses} ${sizeClasses} ${disabledClasses}`;
  }

  /**
   * Get leading dropdown button classes
   */
  getLeadingDropdownButtonClasses(): string {
    const baseClasses = 'flex items-center gap-2 px-3 py-2 border-r-2 border-ui-border dark:border-ui-border-dark transition-colors';
    const hoverClasses = !this.disabled()
      ? 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark cursor-pointer'
      : 'cursor-not-allowed opacity-50';
    const textClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark';

    return `${baseClasses} ${hoverClasses} ${textClasses}`;
  }

  /**
   * Get trailing dropdown button classes
   */
  getTrailingDropdownButtonClasses(): string {
    const baseClasses = 'flex items-center gap-2 px-3 py-2 border-l-2 border-ui-border dark:border-ui-border-dark transition-colors';
    const hoverClasses = !this.disabled()
      ? 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark cursor-pointer'
      : 'cursor-not-allowed opacity-50';
    const textClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark';

    return `${baseClasses} ${hoverClasses} ${textClasses}`;
  }

  /**
   * Get trailing button classes
   */
  getTrailingButtonClasses(): string {
    const baseClasses = 'flex items-center gap-2 px-3 py-2 border-l-2 border-ui-border dark:border-ui-border-dark transition-all duration-200';
    const hoverClasses = !this.disabled()
      ? 'hover:bg-brand-primary hover:text-white hover:border-brand-primary cursor-pointer'
      : 'cursor-not-allowed opacity-50';
    const textClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark';

    return `${baseClasses} ${hoverClasses} ${textClasses}`;
  }

  /**
   * Get leading dropdown menu classes
   */
  getLeadingDropdownMenuClasses(): string {
    return 'absolute left-0 mt-2 w-48 bg-ui-bg-primary dark:bg-ui-bg-primary-dark border-2 border-ui-border dark:border-ui-border-dark rounded-lg shadow-lg z-10 overflow-hidden';
  }

  /**
   * Get trailing dropdown menu classes
   */
  getTrailingDropdownMenuClasses(): string {
    return 'absolute right-0 mt-2 w-48 bg-ui-bg-primary dark:bg-ui-bg-primary-dark border-2 border-ui-border dark:border-ui-border-dark rounded-lg shadow-lg z-10 overflow-hidden';
  }

  /**
   * Get leading dropdown option classes
   */
  getLeadingDropdownOptionClasses(option: DropdownOption): string {
    const baseClasses = 'w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2';
    const hoverClasses = 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark';
    const selectedClasses = this.selectedLeadingDropdownOption()?.id === option.id
      ? 'bg-ui-active dark:bg-ui-active-dark text-brand-primary font-medium'
      : 'text-ui-text-primary dark:text-ui-text-primary-dark';

    return `${baseClasses} ${hoverClasses} ${selectedClasses}`;
  }

  /**
   * Get trailing dropdown option classes
   */
  getTrailingDropdownOptionClasses(option: DropdownOption): string {
    const baseClasses = 'w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2';
    const hoverClasses = 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark';
    const selectedClasses = this.selectedTrailingDropdownOption()?.id === option.id
      ? 'bg-ui-active dark:bg-ui-active-dark text-brand-primary font-medium'
      : 'text-ui-text-primary dark:text-ui-text-primary-dark';

    return `${baseClasses} ${hoverClasses} ${selectedClasses}`;
  }

  /**
   * Get error icon SVG
   */
  getErrorIcon(): string {
    return `<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`;
  }

  /**
   * Get required asterisk
   */
  get requiredAsterisk(): string {
    return this.required() ? '*' : '';
  }
}

import { Component, input, signal, computed, inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-toggle',
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  // Primitive inputs only (non-form related)
  size = input<ToggleSize>('md');
  label = input<string>('');
  icon = input<string>('');

  // Internal state
  private sanitizer = inject(DomSanitizer);

  // Form control state
  value = signal<boolean>(false);
  isDisabled = signal<boolean>(false);

  // ControlValueAccessor callbacks
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  toggleClasses = computed<string>(() => {
    const baseClasses = 'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors-base duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';

    const sizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-14'
    };

    const stateClasses = this.value()
      ? 'bg-brand-primary'
      : 'bg-ui-border dark:bg-ui-border-dark';

    const disabledClasses = this.isDisabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${stateClasses} ${disabledClasses}`;
  });

  switchClasses = computed<string>(() => {
    const baseClasses = 'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out';

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    const positionClasses = this.value()
      ? this.size() === 'sm' ? 'translate-x-4' : this.size() === 'lg' ? 'translate-x-7' : 'translate-x-5'
      : 'translate-x-0.5';

    return `${baseClasses} ${sizeClasses[this.size()]} ${positionClasses}`;
  });

  labelClasses = computed<string>(() => {
    const baseClasses = 'text-ui-text-primary dark:text-ui-text-primary-dark font-medium select-none';

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });

  onToggle(): void {
    if (!this.isDisabled()) {
      const newValue = !this.value();
      this.value.set(newValue);
      this.onChange(newValue);
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}

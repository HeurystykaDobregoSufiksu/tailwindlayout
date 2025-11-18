import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type RadioSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-radio-button',
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  // Primitive inputs only
  value = input.required<string>();
  name = input.required<string>();
  size = input<RadioSize>('md');
  label = input<string>('');
  id = input<string>('');

  // Internal state (managed by parent RadioGroupComponent)
  isChecked = signal<boolean>(false);
  isDisabled = signal<boolean>(false);

  // Outputs
  selected = output<string>();

  // Computed values
  radioClasses = computed<string>(() => {
    const baseClasses = 'appearance-none border-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';

    const sizeClasses = {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6'
    };

    const stateClasses = this.isChecked()
      ? 'bg-white border-brand-primary'
      : 'bg-white dark:bg-ui-bg-primary-dark border-ui-border dark:border-ui-border-dark';

    const disabledClasses = this.isDisabled()
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:border-brand-primary dark:hover:border-brand-primary';

    return `${baseClasses} ${sizeClasses[this.size()]} ${stateClasses} ${disabledClasses}`;
  });

  labelClasses = computed<string>(() => {
    const baseClasses = 'text-ui-text-primary dark:text-ui-text-primary-dark font-medium select-none';

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    const disabledClasses = this.isDisabled() ? 'opacity-50' : 'cursor-pointer';

    return `${baseClasses} ${sizeClasses[this.size()]} ${disabledClasses}`;
  });

  dotClasses = computed<string>(() => {
    const sizeClasses = {
      sm: 'size-2',
      md: 'size-2.5',
      lg: 'size-3'
    };

    return `bg-brand-primary rounded-full ${sizeClasses[this.size()]}`;
  });

  onChange(): void {
    if (!this.isDisabled()) {
      this.selected.emit(this.value());
    }
  }

  // Called by parent RadioGroupComponent to update state
  updateFromGroup(selectedValue: string, groupDisabled: boolean): void {
    this.isChecked.set(this.value() === selectedValue);
    this.isDisabled.set(groupDisabled);
  }
}

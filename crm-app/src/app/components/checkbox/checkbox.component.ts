import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  // Primitive inputs only
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);
  disabled = input<boolean>(false);
  size = input<CheckboxSize>('md');
  label = input<string>('');
  name = input<string>('');
  id = input<string>('');

  // Outputs
  checkedChange = output<boolean>();

  // Computed values
  checkboxClasses = computed<string>(() => {
    const baseClasses = 'appearance-none border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';

    const sizeClasses = {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6'
    };

    const stateClasses = this.checked() || this.indeterminate()
      ? 'bg-brand-primary border-brand-primary'
      : 'bg-white dark:bg-ui-bg-primary-dark border-ui-border dark:border-ui-border-dark hover:border-brand-primary';

    const disabledClasses = this.disabled()
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

    const disabledClasses = this.disabled() ? 'opacity-50' : 'cursor-pointer';

    return `${baseClasses} ${sizeClasses[this.size()]} ${disabledClasses}`;
  });

  checkIconClasses = computed<string>(() => {
    const sizeClasses = {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5'
    };

    return `text-white ${sizeClasses[this.size()]}`;
  });

  onChange(): void {
    if (!this.disabled()) {
      this.checkedChange.emit(!this.checked());
    }
  }
}

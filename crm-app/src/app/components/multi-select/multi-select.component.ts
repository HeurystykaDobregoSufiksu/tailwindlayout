import {
  Component,
  input,
  signal,
  computed,
  inject,
  HostListener,
  ContentChildren,
  QueryList,
  AfterContentInit,
  forwardRef,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultiSelectItemComponent } from './multi-select-item.component';

export type MultiSelectSize = 'sm' | 'md' | 'lg';
export type MultiSelectPosition = 'left' | 'right';

@Component({
  selector: 'app-multi-select',
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, AfterContentInit {
  // Primitive inputs only (non-form related)
  label = input<string>('Select options');
  icon = input<string>('');
  size = input<MultiSelectSize>('md');
  position = input<MultiSelectPosition>('left');
  placeholder = input<string>('Select options');
  maxDisplayItems = input<number>(2);

  // Form control state - stores comma-separated string
  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Internal state
  isOpen = signal(false);
  private sanitizer = inject(DomSanitizer);

  // Content projection
  @ContentChildren(MultiSelectItemComponent) selectItems!: QueryList<MultiSelectItemComponent>;

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  selectedValuesArray = computed<string[]>(() => {
    const values = this.value();
    return values ? values.split(',').map(v => v.trim()).filter(v => v) : [];
  });

  buttonClasses = computed<string>(() => {
    const baseClasses = 'inline-flex items-center justify-between gap-2 font-medium transition-colors-base rounded-button border-2 w-full';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg'
    };

    const stateClasses = 'bg-white dark:bg-ui-bg-primary-dark border-ui-border dark:border-ui-border-dark text-ui-text-primary dark:text-ui-text-primary-dark hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';

    const disabledClasses = this.isDisabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${stateClasses} ${disabledClasses}`;
  });

  dropdownClasses = computed<string>(() => {
    const positionClasses = this.position() === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right';
    return `absolute mt-2 w-full min-w-[12rem] rounded-card bg-white dark:bg-ui-bg-primary-dark border-2 border-ui-border dark:border-ui-border-dark shadow-card z-50 max-h-60 overflow-y-auto ${positionClasses}`;
  });

  displayLabel = computed<string>(() => {
    const selected = this.selectedValuesArray();
    if (selected.length === 0) {
      return this.placeholder();
    }

    // Get labels for selected items
    const labels = selected
      .map(value => {
        const item = this.selectItems?.find(item => item.value() === value);
        return item?.label() || value;
      })
      .filter(Boolean);

    if (labels.length === 0) {
      return this.placeholder();
    }

    const max = this.maxDisplayItems();
    if (labels.length <= max) {
      return labels.join(', ');
    }

    const displayed = labels.slice(0, max);
    const remaining = labels.length - max;
    return `${displayed.join(', ')} +${remaining} more`;
  });

  constructor() {
    // Update multi-select items when value changes
    effect(() => {
      const currentValues = this.selectedValuesArray();
      this.selectItems?.forEach((item) => {
        item.updateFromParent(currentValues);
      });
    });
  }

  ngAfterContentInit(): void {
    // Subscribe to item selections
    this.selectItems?.forEach((item) => {
      item.itemToggled.subscribe((value: string) => {
        this.onItemToggle(value);
      });
    });

    // Set initial state for all items
    this.updateSelectItems();
  }

  toggleDropdown(): void {
    if (!this.isDisabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  onItemToggle(toggledValue: string): void {
    if (!this.isDisabled()) {
      const current = this.selectedValuesArray();
      let updated: string[];

      if (current.includes(toggledValue)) {
        // Remove value
        updated = current.filter(v => v !== toggledValue);
      } else {
        // Add value
        updated = [...current, toggledValue];
      }

      // Update form control value as comma-separated string
      const newValue = updated.join(',');
      this.value.set(newValue);
      this.onChange(newValue);
      this.onTouched();
      this.updateSelectItems();
    }
  }

  clearSelection(): void {
    if (!this.isDisabled()) {
      this.value.set('');
      this.onChange('');
      this.onTouched();
      this.updateSelectItems();
    }
  }

  private updateSelectItems(): void {
    const selected = this.selectedValuesArray();
    this.selectItems?.forEach((item) => {
      item.updateFromParent(selected);
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.multi-select-container');

    if (!clickedInside && this.isOpen()) {
      this.closeDropdown();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value ?? '');
    this.updateSelectItems();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  private chevronIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';

  get safeChevronIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.chevronIcon);
  }
}

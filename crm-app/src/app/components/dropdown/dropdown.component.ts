import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  HostListener,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DropdownItemComponent } from './dropdown-item.component';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownPosition = 'left' | 'right';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements AfterContentInit {
  // Primitive inputs only
  label = input<string>('Select option');
  selectedValue = input<string>('');
  icon = input<string>('');
  size = input<DropdownSize>('md');
  position = input<DropdownPosition>('left');
  disabled = input<boolean>(false);
  placeholder = input<string>('Select an option');

  // Outputs
  selectionChange = output<string>();

  // Internal state
  isOpen = signal(false);
  private sanitizer = inject(DomSanitizer);

  // Content projection
  @ContentChildren(DropdownItemComponent) dropdownItems!: QueryList<DropdownItemComponent>;

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  buttonClasses = computed<string>(() => {
    const baseClasses = 'inline-flex items-center justify-between gap-2 font-medium transition-colors-base rounded-button border-2 w-full';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg'
    };

    const stateClasses = 'bg-white dark:bg-ui-bg-primary-dark border-ui-border dark:border-ui-border-dark text-ui-text-primary dark:text-ui-text-primary-dark hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';

    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${stateClasses} ${disabledClasses}`;
  });

  dropdownClasses = computed<string>(() => {
    const positionClasses = this.position() === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right';
    return `absolute mt-2 w-full min-w-[12rem] rounded-card bg-white dark:bg-ui-bg-primary-dark border-2 border-ui-border dark:border-ui-border-dark shadow-card z-50 max-h-60 overflow-y-auto ${positionClasses}`;
  });

  displayLabel = computed<string>(() => {
    const selected = this.selectedValue();
    if (!selected) {
      return this.placeholder();
    }

    // Find the selected item's label from content children
    const selectedItem = this.dropdownItems?.find(item => item.value() === selected);
    return selectedItem?.label() || selected;
  });

  ngAfterContentInit(): void {
    // Subscribe to item selections
    this.dropdownItems?.forEach((item) => {
      item.itemSelected.subscribe((value: string) => {
        this.onItemSelect(value);
      });
    });
  }

  toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  onItemSelect(value: string): void {
    this.selectionChange.emit(value);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-container');

    if (!clickedInside && this.isOpen()) {
      this.closeDropdown();
    }
  }

  private chevronIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';

  get safeChevronIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.chevronIcon);
  }
}

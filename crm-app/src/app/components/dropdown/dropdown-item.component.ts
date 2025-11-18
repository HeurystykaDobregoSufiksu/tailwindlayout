import { Component, input, output, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown-item',
  imports: [CommonModule],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.scss'
})
export class DropdownItemComponent {
  // Primitive inputs only
  value = input.required<string>();
  label = input.required<string>();
  icon = input<string>('');
  disabled = input<boolean>(false);

  // Internal state (managed by parent DropdownComponent)
  isSelected = signal<boolean>(false);

  // Outputs
  itemSelected = output<string>();

  // Internal state
  private sanitizer = inject(DomSanitizer);

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  itemClasses = computed<string>(() => {
    const baseClasses = 'flex items-center gap-3 px-4 py-2 text-sm transition-colors-base cursor-pointer';

    const stateClasses = this.isSelected()
      ? 'bg-brand-primary text-white'
      : 'text-ui-text-primary dark:text-ui-text-primary-dark hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark';

    const disabledClasses = this.disabled()
      ? 'opacity-50 cursor-not-allowed'
      : '';

    return `${baseClasses} ${stateClasses} ${disabledClasses}`;
  });

  onClick(): void {
    if (!this.disabled()) {
      this.itemSelected.emit(this.value());
    }
  }

  // Called by parent DropdownComponent to update state
  updateFromParent(selectedValue: string): void {
    this.isSelected.set(this.value() === selectedValue);
  }
}

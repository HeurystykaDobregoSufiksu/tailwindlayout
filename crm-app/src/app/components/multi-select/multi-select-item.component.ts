import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-multi-select-item',
  imports: [CommonModule],
  templateUrl: './multi-select-item.component.html',
  styleUrl: './multi-select-item.component.scss'
})
export class MultiSelectItemComponent {
  // Primitive inputs only
  value = input.required<string>();
  label = input.required<string>();
  icon = input<string>('');
  disabled = input<boolean>(false);
  selected = input<boolean>(false);

  // Outputs
  itemToggled = output<string>();

  // Internal state
  private sanitizer = inject(DomSanitizer);

  // Computed values
  safeIcon = computed<SafeHtml>(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });

  itemClasses = computed<string>(() => {
    const baseClasses = 'flex items-center gap-3 px-4 py-2 text-sm transition-colors-base cursor-pointer';

    const stateClasses = this.selected()
      ? 'bg-ui-bg-secondary dark:bg-ui-bg-secondary-dark'
      : 'hover:bg-ui-bg-secondary dark:hover:bg-ui-bg-secondary-dark';

    const disabledClasses = this.disabled()
      ? 'opacity-50 cursor-not-allowed'
      : '';

    return `${baseClasses} ${stateClasses} ${disabledClasses}`;
  });

  onClick(): void {
    if (!this.disabled()) {
      this.itemToggled.emit(this.value());
    }
  }
}

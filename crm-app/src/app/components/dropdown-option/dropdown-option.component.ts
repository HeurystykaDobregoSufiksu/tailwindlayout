import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown-option',
  imports: [CommonModule],
  templateUrl: './dropdown-option.component.html',
  styleUrl: './dropdown-option.component.scss'
})
export class DropdownOptionComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() id = '';

  @Output() optionClick = new EventEmitter<string>();

  private sanitizer = inject(DomSanitizer);

  get safeIcon(): SafeHtml {
    return this.icon ? this.sanitizer.bypassSecurityTrustHtml(this.icon) : '';
  }

  onClick(): void {
    if (!this.disabled) {
      this.optionClick.emit(this.id || this.label);
    }
  }
}

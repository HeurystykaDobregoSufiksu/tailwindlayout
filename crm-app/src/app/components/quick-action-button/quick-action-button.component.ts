import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-quick-action-button',
  imports: [CommonModule],
  templateUrl: './quick-action-button.component.html',
  styleUrl: './quick-action-button.component.scss'
})
export class QuickActionButtonComponent {
  @Input() action!: QuickAction;
  @Output() actionClick = new EventEmitter<QuickAction>();

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.action.icon);
  }

  onActionClick() {
    this.actionClick.emit(this.action);
  }
}

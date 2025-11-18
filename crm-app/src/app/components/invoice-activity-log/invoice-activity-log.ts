import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ActivityItem {
  id: string | number;
  timestampDescription: string;
  actorName: string;
  type: 'action' | 'comment' | 'paid';
  description?: string;
  commentText?: string;
  actorProfileImage?: string;
}

@Component({
  selector: 'app-invoice-activity-log',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-activity-log.html',
  styleUrl: './invoice-activity-log.css',
})
export class InvoiceActivityLog {
  // Input signals
  activityItems = input.required<ActivityItem[]>();
  currentUserProfileImage = input.required<string>();

  // Output signal
  commentSubmitted = output<string>();

  // Internal state signal
  newCommentText = signal('');

  /**
   * Checks if the new comment text is valid (not empty or whitespace-only)
   */
  get isCommentValid(): boolean {
    return this.newCommentText().trim().length > 0;
  }

  /**
   * Handles comment submission
   */
  onSubmitComment(): void {
    const text = this.newCommentText().trim();
    if (text) {
      this.commentSubmitted.emit(text);
      this.newCommentText.set('');
    }
  }

  /**
   * Updates the new comment text
   */
  onCommentTextChange(text: string): void {
    this.newCommentText.set(text);
  }
}

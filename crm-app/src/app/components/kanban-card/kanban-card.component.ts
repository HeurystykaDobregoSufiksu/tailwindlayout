import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, BadgeConfig } from '../badge/badge.component';

export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assignee: {
    initials: string;
    name: string;
    color: string;
  };
  dueDate: string;
  progressTime?: string;
}

@Component({
  selector: 'app-kanban-card',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.scss'
})
export class KanbanCardComponent {
  @Input() task!: KanbanTask;
  @Output() cardClick = new EventEmitter<KanbanTask>();

  getPriorityBadge(): BadgeConfig {
    if (this.task.status === 'done') {
      return {
        label: 'Ukończone',
        variant: 'default',
        color: 'emerald',
        size: 'sm'
      };
    }

    const priorityMap = {
      high: { label: 'Wysoki', color: 'red' as const },
      medium: { label: 'Średni', color: 'amber' as const },
      low: { label: 'Niski', color: 'emerald' as const }
    };

    const priority = priorityMap[this.task.priority];
    return {
      label: priority.label,
      variant: 'default',
      color: priority.color,
      size: 'sm'
    };
  }

  getProgressBadge(): BadgeConfig {
    return {
      label: 'W realizacji',
      variant: 'status',
      color: 'blue',
      animated: true
    };
  }

  getCompletionBadge(): BadgeConfig {
    return {
      label: 'Ukończone pomyślnie',
      variant: 'status',
      color: 'emerald',
      icon: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
    };
  }

  onCardClick() {
    this.cardClick.emit(this.task);
  }
}

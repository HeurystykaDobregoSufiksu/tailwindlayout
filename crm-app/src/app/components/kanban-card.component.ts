import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, BadgeConfig } from './badge.component';

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
  template: `
    <div
      (click)="onCardClick()"
      [ngClass]="{
        'border-slate-200/50 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600': task.status === 'todo',
        'border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-600': task.status === 'in-progress',
        'border-slate-200/50 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600': task.status === 'done'
      }"
      class="group bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer border transition-all duration-200">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <app-badge [config]="getPriorityBadge()"></app-badge>
        </div>
        <button class="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-opacity">
          <svg class="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
      <h4
        [ngClass]="{
          'line-through decoration-slate-300 dark:decoration-slate-600': task.status === 'done'
        }"
        class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">{{ task.title }}</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed" [class.mb-4]="!task.progressTime">{{ task.description }}</p>

      <!-- Progress Badge (only for in-progress tasks) -->
      <div *ngIf="task.status === 'in-progress' && task.progressTime" class="bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-md px-3 py-2 mb-3 flex items-center justify-between">
        <app-badge [config]="getProgressBadge()"></app-badge>
        <span class="text-xs text-blue-600 dark:text-blue-400 font-mono font-medium">{{ task.progressTime }}</span>
      </div>

      <!-- Completion Badge (only for done tasks) -->
      <div *ngIf="task.status === 'done'" class="mb-3">
        <app-badge [config]="getCompletionBadge()"></app-badge>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700" [class.border-slate-100]="task.status !== 'done'">
        <div class="flex items-center space-x-2">
          <div
            [ngStyle]="{'background': task.assignee.color}"
            class="w-6 h-6 rounded-md flex items-center justify-center text-xs text-white font-medium">
            {{ task.assignee.initials }}
          </div>
          <span class="text-xs text-slate-600 dark:text-slate-300 font-medium" [class.text-slate-600]="task.status !== 'done'">{{ task.assignee.name }}</span>
        </div>
        <div class="flex items-center text-xs text-slate-500 dark:text-slate-400" [class.text-slate-500]="task.status !== 'done'">
          <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              *ngIf="task.status !== 'done'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            <path
              *ngIf="task.status === 'done'"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ task.dueDate }}
        </div>
      </div>
    </div>
  `
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

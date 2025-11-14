import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanCardComponent, KanbanTask } from './kanban-card.component';

export type ColumnStatus = 'todo' | 'in-progress' | 'done';

export interface KanbanColumn {
  id: string;
  title: string;
  status: ColumnStatus;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-kanban-column',
  imports: [CommonModule, KanbanCardComponent],
  template: `
    <div
      [ngClass]="{
        'bg-white/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60': column.status === 'todo',
        'bg-white/50 dark:bg-slate-800/50 border-blue-200/60 dark:border-blue-700/60': column.status === 'in-progress',
        'bg-white/50 dark:bg-slate-800/50 border-emerald-200/60 dark:border-emerald-700/60': column.status === 'done'
      }"
      class="rounded-xl p-4 border">
      <div
        [ngClass]="{
          'border-slate-200 dark:border-slate-700': column.status === 'todo',
          'border-blue-200 dark:border-blue-700': column.status === 'in-progress',
          'border-emerald-200 dark:border-emerald-700': column.status === 'done'
        }"
        class="flex items-center justify-between mb-4 pb-3 border-b">
        <div class="flex items-center space-x-2">
          <div
            [ngClass]="{
              'bg-slate-400 dark:bg-slate-500': column.status === 'todo',
              'bg-blue-500 dark:bg-blue-400 animate-pulse': column.status === 'in-progress',
              'bg-emerald-500 dark:bg-emerald-400': column.status === 'done'
            }"
            class="w-2 h-2 rounded-full"></div>
          <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ column.title }}</h3>
          <span
            [ngClass]="{
              'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300': column.status === 'todo',
              'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700': column.status === 'in-progress',
              'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700': column.status === 'done'
            }"
            class="text-xs px-2 py-0.5 rounded-md font-medium">{{ column.tasks.length }}</span>
        </div>
      </div>

      <div class="space-y-3">
        <app-kanban-card
          *ngFor="let task of column.tasks"
          [task]="task"
          (cardClick)="onTaskClick($event)">
        </app-kanban-card>
      </div>
    </div>
  `
})
export class KanbanColumnComponent {
  @Input() column!: KanbanColumn;
  @Output() taskClick = new EventEmitter<KanbanTask>();

  onTaskClick(task: KanbanTask) {
    this.taskClick.emit(task);
  }
}

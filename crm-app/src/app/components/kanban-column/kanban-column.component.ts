import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanCardComponent, KanbanTask } from '../kanban-card/kanban-card.component';

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
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss'
})
export class KanbanColumnComponent {
  @Input() column!: KanbanColumn;
  @Output() taskClick = new EventEmitter<KanbanTask>();

  onTaskClick(task: KanbanTask) {
    this.taskClick.emit(task);
  }
}

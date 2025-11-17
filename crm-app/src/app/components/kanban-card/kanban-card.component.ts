import { Component, Input, Output, EventEmitter, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeColor, BadgeComponent } from '../badge/badge.component';

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
  task= input.required<KanbanTask>();
  cardClick = output<KanbanTask>();
 
 labelComputed= computed<string>(()=>{
    if(this.task().priority=='high')return "Wysoki";
    else if(this.task().priority=='medium')return "Średni";
    return "Niski"
  })
  colorComputed= computed<BadgeColor>(()=>{
    if(this.task().priority=='high')return 'red';
    else if(this.task().priority=='medium')return 'amber';
    return 'blue'
  })
  
  onCardClick() {
    this.cardClick.emit(this.task());
  }
}

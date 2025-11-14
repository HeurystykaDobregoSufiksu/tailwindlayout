import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserInfo {
  initials: string;
  name: string;
  role: string;
  location: string;
  stats: {
    clients: number;
    tasks: number;
    performance: number;
  };
}

@Component({
  selector: 'app-user-info-card',
  imports: [CommonModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})
export class UserInfoCardComponent {
  @Input() userInfo!: UserInfo;
}

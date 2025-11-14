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
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md mb-4 ring-4 ring-indigo-100 dark:ring-indigo-900/30">
          {{ userInfo.initials }}
        </div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{{ userInfo.name }}</h3>
        <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{{ userInfo.role }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ userInfo.location }}</p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mt-6 w-full">
          <div class="text-center">
            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ userInfo.stats.clients }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Klienci</p>
          </div>
          <div class="text-center border-x border-slate-100 dark:border-slate-700">
            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ userInfo.stats.tasks }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Zadania</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ userInfo.stats.performance }}%</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Wynik</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserInfoCardComponent {
  @Input() userInfo!: UserInfo;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type BadgeVariant = 'default' | 'pill' | 'status';
export type BadgeColor = 'red' | 'amber' | 'emerald' | 'blue' | 'slate' | 'indigo' | 'white';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  animated?: boolean;
}

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  template: `
    <span
      [ngClass]="{
       
        'inline-flex items-center rounded-md border': config.variant === 'default' || !config.variant,
        'inline-flex items-center rounded-full': config.variant === 'pill',
        'flex items-center rounded-md border': config.variant === 'status',

     
        'px-2 py-0.5 text-xs': (config.size === 'sm' || !config.size) && config.variant !== 'status',
        'px-2.5 py-1 text-xs': config.size === 'md' && config.variant !== 'status',
        'px-3 py-1.5 text-sm': config.size === 'lg' && config.variant !== 'status',
        'px-3 py-2': config.variant === 'status',

        
        'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800': config.color === 'red',

     
        'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700': config.color === 'amber',

      
        'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700': config.color === 'emerald',

       
        'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700': config.color === 'blue',
        
        'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700': config.color === 'slate',

        
        'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700': config.color === 'indigo',

    
        'bg-white/20 text-white border-white/0': config.color === 'white',


      
        'space-x-2': config.variant === 'status' && config.icon,
        'justify-between': config.variant === 'status' && config.iconPosition === 'right'
      }"
      class="font-medium rounded-lg ">

      <!-- Icon (left position or status variant) -->
      <ng-container *ngIf="config.icon && (config.iconPosition !== 'right' || config.variant === 'status')">
        <!-- Animated dot for status badges -->
        <div *ngIf="config.animated && config.variant === 'status'"
             class="w-1.5 h-1.5 rounded-full animate-pulse"
             [ngClass]="{
               'bg-red-500 dark:bg-red-400': config.color === 'red',
               'bg-amber-500 dark:bg-amber-400': config.color === 'amber',
               'bg-emerald-500 dark:bg-emerald-400': config.color === 'emerald',
               'bg-blue-500 dark:bg-blue-400': config.color === 'blue',
               'bg-slate-500 dark:bg-slate-400': config.color === 'slate',
               'bg-indigo-500 dark:bg-indigo-400': config.color === 'indigo'
             }">
        </div>

        <!-- Regular icon -->
        <svg *ngIf="!config.animated || config.variant !== 'status'"
             [ngClass]="{
               'w-3.5 h-3.5': config.variant === 'status',
               'w-3 h-3': config.variant !== 'status'
             }"
             fill="currentColor" viewBox="0 0 20 20">
          <g [innerHTML]="getSafeIcon()"></g>
        </svg>
      </ng-container>

      <!-- Label -->
      <span [ngClass]="{
        'text-xs': config.variant === 'status' || config.size === 'sm' || config.size === 'md' || !config.size,
        'text-sm': config.size === 'lg'
      }">{{ config.label }}</span>

      <!-- Icon (right position, non-status only) -->
      <svg *ngIf="config.icon && config.iconPosition === 'right' && config.variant !== 'status'"
           class="w-3 h-3 ml-1"
           fill="currentColor" viewBox="0 0 20 20">
        <g [innerHTML]="getSafeIcon()"></g>
      </svg>
    </span>
  `
})
export class BadgeComponent {
  @Input() config!: BadgeConfig;

  constructor(private sanitizer: DomSanitizer) {}

  getSafeIcon(): SafeHtml {
    return this.config.icon ? this.sanitizer.bypassSecurityTrustHtml(this.config.icon) : '';
  }
}

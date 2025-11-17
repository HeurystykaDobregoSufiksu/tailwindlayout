import { NgClass } from '@angular/common';
import { Component, inject, input, Type } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


export type IconSize=6|12|24|64|128;

@Component({
  selector: 'app-empty-state-info',
  imports: [NgClass],
  templateUrl: './empty-state-info.html',
  styleUrl: './empty-state-info.css',
})

export class EmptyStateInfo {
  private sanitizer = inject(DomSanitizer);

  header=input.required<string>();
  description=input<string>();
  buttonText=input<string>();
  icon=input<string>('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /> </svg>');
  iconSize=input<IconSize>(64);
   getSafeIcon(): SafeHtml {
    return this.icon() ? this.sanitizer.bypassSecurityTrustHtml(this.icon()??"") : '';
  }
}

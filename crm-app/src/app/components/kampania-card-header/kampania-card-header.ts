import { Component, input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";

@Component({
  selector: 'app-kampania-card-header',
  imports: [BadgeComponent],
  templateUrl: './kampania-card-header.html',
  styleUrl: './kampania-card-header.css',
})
export class KampaniaCardHeader {
  title = input.required<string>();
  description = input<string>();
  startDate = input.required<Date>();
  endDate = input<Date>();
  progress = input<number>();
}

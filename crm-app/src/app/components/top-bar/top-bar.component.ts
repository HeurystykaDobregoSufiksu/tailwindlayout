import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavButtonComponent, NavButton } from '../nav-button/nav-button.component';
import { IconButtonComponent, IconButtonConfig } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, NavButtonComponent, IconButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  @Input() navButtons!: NavButton[];
  @Input() isDarkMode: boolean = false;
  @Input() mobileMenuButton!: IconButtonConfig;
  @Input() themeButton!: IconButtonConfig;

  @Output() navButtonClick = new EventEmitter<NavButton>();
  @Output() mobileMenuClick = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  onNavButtonClick(button: NavButton) {
    this.navButtonClick.emit(button);
  }

  onMobileMenuClick() {
    this.mobileMenuClick.emit();
  }

  onThemeToggle() {
    this.themeToggle.emit();
  }
}

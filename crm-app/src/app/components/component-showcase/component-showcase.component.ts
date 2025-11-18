import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

// Form Controls
import { InputComponent } from '../input/input.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { RadioButtonComponent } from '../radio-group/radio-button.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItemComponent } from '../dropdown/dropdown-item.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { MultiSelectItemComponent } from '../multi-select/multi-select-item.component';

// Buttons
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ButtonGroupComponent } from '../button-group/button-group.component';

// Badges & Status
import { BadgeComponent } from '../badge/badge.component';
import { NotificationCardComponent } from '../notification-card/notification-card.component';

// Data Display
import { StatCardComponent } from '../stat-card/stat-card.component';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';

// Complex Components
import { ProgressWizardComponent } from '../progress-wizard/progress-wizard.component';

export type CategoryType = 'all' | 'form-controls' | 'buttons' | 'badges' | 'data-display' | 'complex';

interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-component-showcase',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Form Controls
    InputComponent,
    CheckboxComponent,
    ToggleComponent,
    RadioGroupComponent,
    RadioButtonComponent,
    DropdownComponent,
    DropdownItemComponent,
    MultiSelectComponent,
    MultiSelectItemComponent,
    // Buttons
    ButtonComponent,
    IconButtonComponent,
    ButtonGroupComponent,
    // Badges & Status
    BadgeComponent,
    NotificationCardComponent,
    // Data Display
    StatCardComponent,
    KanbanCardComponent,
    // Complex Components
    ProgressWizardComponent,
  ],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss'
})
export class ComponentShowcaseComponent {
  // Active category tracking
  activeCategory = signal<CategoryType>('all');

  // Categories for navigation
  categories: Category[] = [
    {
      id: 'all',
      name: 'All Components',
      icon: '◼',
      description: 'View all components at once'
    },
    {
      id: 'form-controls',
      name: 'Form Controls',
      icon: '📝',
      description: 'Input fields, checkboxes, toggles, and selectors'
    },
    {
      id: 'buttons',
      name: 'Buttons',
      icon: '🔘',
      description: 'Various button styles and variants'
    },
    {
      id: 'badges',
      name: 'Badges & Status',
      icon: '🏷️',
      description: 'Badges, notifications, and status indicators'
    },
    {
      id: 'data-display',
      name: 'Data Display',
      icon: '📊',
      description: 'Cards, stats, and data visualization'
    },
    {
      id: 'complex',
      name: 'Complex Components',
      icon: '🎨',
      description: 'Advanced multi-part components'
    }
  ];

  // Form controls for demonstrations
  textInput = new FormControl('Sample text');
  emailInput = new FormControl('example@email.com');
  numberInput = new FormControl(42);
  passwordInput = new FormControl('password123');
  searchInput = new FormControl('');

  checkboxValue = new FormControl(true);
  checkboxIndeterminate = new FormControl(false);

  toggleValue = new FormControl(true);

  radioValue = new FormControl('option2');

  dropdownValue = new FormControl('option1');
  dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  multiSelectValue = new FormControl(['option1', 'option3']);
  multiSelectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  // Sample data for complex components
  wizardSteps = [
    { id: 'personal-info', label: 'Personal Info', icon: '👤', status: 'completed' as const },
    { id: 'contact-details', label: 'Contact Details', icon: '📧', status: 'completed' as const },
    { id: 'preferences', label: 'Preferences', icon: '⚙️', status: 'current' as const },
    { id: 'review', label: 'Review', icon: '✓', status: 'upcoming' as const },
    { id: 'complete', label: 'Complete', icon: '🎉', status: 'upcoming' as const }
  ];

  kanbanCardData = {
    id: '1',
    title: 'Implement new feature',
    description: 'Add dark mode support to the application',
    assignee: {
      initials: 'JD',
      name: 'John Doe',
      color: 'linear-gradient(to bottom right, #3b82f6, #2563eb)'
    },
    priority: 'high' as const,
    status: 'in-progress' as const,
    dueDate: 'Dec 31',
    progressTime: '4h 30m'
  };

  // Set active category
  setCategory(categoryId: CategoryType): void {
    this.activeCategory.set(categoryId);
  }

  // Check if category should be visible
  shouldShowCategory(category: CategoryType): boolean {
    return this.activeCategory() === 'all' || this.activeCategory() === category;
  }

  // Button click handlers for demonstration
  handleButtonClick(): void {
    console.log('Button clicked!');
  }

  handleIconButtonClick(action: string): void {
    console.log('Icon button clicked:', action);
  }

  // Notification handler
  handleNotificationAction(action: string): void {
    console.log('Notification action:', action);
  }
}

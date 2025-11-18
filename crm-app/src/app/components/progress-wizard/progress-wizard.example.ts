/**
 * Progress Wizard Component - Usage Examples
 *
 * This file demonstrates how to use the ProgressWizardComponent in your Angular application.
 */

import { Component } from '@angular/core';
import { ProgressWizardComponent, WizardStep } from './progress-wizard.component';

@Component({
  selector: 'app-progress-wizard-example',
  imports: [ProgressWizardComponent],
  template: `
    <div class="p-8 space-y-12">
      <!-- Example 1: Horizontal Wizard with Descriptions -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Horizontal Progress Wizard</h2>
        <app-progress-wizard [steps]="horizontalSteps" orientation="horizontal" />
      </div>

      <!-- Example 2: Vertical Wizard -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Vertical Progress Wizard</h2>
        <app-progress-wizard
          [steps]="verticalSteps"
          orientation="vertical"
          [compact]="false"
        />
      </div>

      <!-- Example 3: Compact Horizontal -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Compact Horizontal Wizard</h2>
        <app-progress-wizard
          [steps]="compactSteps"
          orientation="horizontal"
          [compact]="true"
        />
      </div>

      <!-- Example 4: Without Connectors -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Without Connectors</h2>
        <app-progress-wizard
          [steps]="horizontalSteps"
          orientation="horizontal"
          [showConnectors]="false"
        />
      </div>

      <!-- Example 5: Custom Icons -->
      <div>
        <h2 class="text-2xl font-bold mb-4">With Custom Icons</h2>
        <app-progress-wizard
          [steps]="customIconSteps"
          orientation="horizontal"
        />
      </div>
    </div>
  `
})
export class ProgressWizardExampleComponent {
  // Example 1: Basic horizontal wizard with all states
  horizontalSteps: WizardStep[] = [
    {
      id: 'account',
      label: 'Account Details',
      description: 'Enter your personal information',
      status: 'completed'
    },
    {
      id: 'verification',
      label: 'Verification',
      description: 'Verify your email address',
      status: 'completed'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      description: 'Customize your experience',
      status: 'current'
    },
    {
      id: 'review',
      label: 'Review',
      description: 'Review and confirm',
      status: 'upcoming'
    }
  ];

  // Example 2: Vertical wizard
  verticalSteps: WizardStep[] = [
    {
      id: 'order',
      label: 'Order Placed',
      description: 'Your order has been received',
      status: 'completed'
    },
    {
      id: 'processing',
      label: 'Processing',
      description: 'We are preparing your order',
      status: 'completed'
    },
    {
      id: 'shipping',
      label: 'Shipped',
      description: 'Your order is on the way',
      status: 'current'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      description: 'Order delivered to your address',
      status: 'upcoming'
    }
  ];

  // Example 3: Compact steps without descriptions
  compactSteps: WizardStep[] = [
    {
      id: 'step1',
      label: 'Personal Info',
      status: 'completed'
    },
    {
      id: 'step2',
      label: 'Payment',
      status: 'current'
    },
    {
      id: 'step3',
      label: 'Confirmation',
      status: 'upcoming'
    }
  ];

  // Example 4: Steps with custom icons
  customIconSteps: WizardStep[] = [
    {
      id: 'user',
      label: 'User Info',
      description: 'Basic information',
      status: 'completed',
      icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>`
    },
    {
      id: 'payment',
      label: 'Payment',
      description: 'Payment details',
      status: 'current',
      icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>`
    },
    {
      id: 'confirm',
      label: 'Confirm',
      description: 'Review and submit',
      status: 'upcoming',
      icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`
    }
  ];
}

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Import the component:
 *    import { ProgressWizardComponent, WizardStep } from './components/progress-wizard/progress-wizard.component';
 *
 * 2. Define your steps with the WizardStep interface:
 *    - id: Unique identifier for the step
 *    - label: Display text for the step
 *    - description: (Optional) Additional description
 *    - status: 'completed' | 'current' | 'upcoming'
 *    - icon: (Optional) Custom SVG icon string
 *
 * 3. Use in your template:
 *    <app-progress-wizard
 *      [steps]="mySteps"
 *      [orientation]="'horizontal'"  // or 'vertical'
 *      [showConnectors]="true"       // default: true
 *      [showStepNumbers]="true"      // default: true
 *      [compact]="false"             // default: false
 *    />
 *
 * 4. Component Properties:
 *    - steps: WizardStep[] (required) - Array of wizard steps
 *    - orientation: 'horizontal' | 'vertical' (default: 'horizontal')
 *    - showConnectors: boolean (default: true) - Show lines between steps
 *    - showStepNumbers: boolean (default: true) - Show numbers in step markers
 *    - compact: boolean (default: false) - Use smaller size for compact layouts
 *
 * 5. Styling:
 *    The component uses your project's Tailwind configuration:
 *    - Brand colors (brand-primary)
 *    - Semantic UI colors (ui-text-*, ui-bg-*, ui-border-*)
 *    - Dark mode support
 *    - Custom animations
 *
 * 6. Updating Steps:
 *    Simply update the steps array with new status values:
 *
 *    updateStepStatus(stepId: string, newStatus: StepStatus) {
 *      this.mySteps = this.mySteps.map(step =>
 *        step.id === stepId ? { ...step, status: newStatus } : step
 *      );
 *    }
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StepStatus = 'completed' | 'current' | 'upcoming';
export type WizardOrientation = 'horizontal' | 'vertical';

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  status: StepStatus;
  icon?: string;
}

@Component({
  selector: 'app-progress-wizard',
  imports: [CommonModule],
  templateUrl: './progress-wizard.component.html',
  styleUrl: './progress-wizard.component.scss'
})
export class ProgressWizardComponent {
  // Component inputs using Angular signals
  steps = input.required<WizardStep[]>();
  orientation = input<WizardOrientation>('horizontal');
  showConnectors = input<boolean>(true);
  showStepNumbers = input<boolean>(true);
  compact = input<boolean>(false);

  /**
   * Get the appropriate icon for a step based on its status
   */
  getStepIcon(step: WizardStep, index: number): string {
    if (step.icon) {
      return step.icon;
    }

    // Default icons based on status
    switch (step.status) {
      case 'completed':
        return `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>`;
      case 'current':
        return this.showStepNumbers() ? `${index + 1}` : '';
      case 'upcoming':
        return this.showStepNumbers() ? `${index + 1}` : '';
      default:
        return '';
    }
  }

  /**
   * Get CSS classes for step container
   */
  getStepClasses(step: WizardStep): string {
    const baseClasses = 'flex items-center transition-all duration-300';
    const orientationClasses = this.orientation() === 'vertical'
      ? 'flex-col items-start'
      : 'flex-row';

    return `${baseClasses} ${orientationClasses}`;
  }

  /**
   * Get CSS classes for step marker (circle/icon container)
   */
  getStepMarkerClasses(step: WizardStep): string {
    const baseClasses = 'flex items-center justify-center rounded-full transition-all duration-300 font-medium';
    const sizeClasses = this.compact() ? 'size-8 text-sm' : 'size-10 text-base';

    let statusClasses = '';
    switch (step.status) {
      case 'completed':
        statusClasses = 'bg-brand-primary text-white shadow-md';
        break;
      case 'current':
        statusClasses = 'bg-brand-primary text-white shadow-lg ring-4 ring-brand-primary/20';
        break;
      case 'upcoming':
        statusClasses = 'bg-ui-bg-tertiary dark:bg-ui-bg-tertiary-dark text-ui-text-muted dark:text-ui-text-muted-dark border-2 border-ui-border dark:border-ui-border-dark';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${statusClasses}`;
  }

  /**
   * Get CSS classes for step text content
   */
  getStepTextClasses(step: WizardStep): string {
    const baseClasses = 'transition-colors duration-300';
    const orientationClasses = this.orientation() === 'vertical' ? 'mt-3' : 'ml-3';

    return `${baseClasses} ${orientationClasses}`;
  }

  /**
   * Get CSS classes for step label
   */
  getStepLabelClasses(step: WizardStep): string {
    const baseClasses = 'font-semibold transition-colors duration-300';
    const sizeClasses = this.compact() ? 'text-sm' : 'text-base';

    let statusClasses = '';
    switch (step.status) {
      case 'completed':
      case 'current':
        statusClasses = 'text-ui-text-primary dark:text-ui-text-primary-dark';
        break;
      case 'upcoming':
        statusClasses = 'text-ui-text-muted dark:text-ui-text-muted-dark';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${statusClasses}`;
  }

  /**
   * Get CSS classes for step description
   */
  getStepDescriptionClasses(step: WizardStep): string {
    const baseClasses = 'transition-colors duration-300';
    const sizeClasses = this.compact() ? 'text-xs mt-0.5' : 'text-sm mt-1';

    let statusClasses = '';
    switch (step.status) {
      case 'completed':
      case 'current':
        statusClasses = 'text-ui-text-secondary dark:text-ui-text-secondary-dark';
        break;
      case 'upcoming':
        statusClasses = 'text-ui-text-muted dark:text-ui-text-muted-dark';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${statusClasses}`;
  }

  /**
   * Get CSS classes for connector line between steps
   */
  getConnectorClasses(index: number): string {
    const isLastStep = index === this.steps().length - 1;
    if (isLastStep) return 'hidden';

    const currentStep = this.steps()[index];
    const nextStep = this.steps()[index + 1];

    const baseClasses = 'transition-all duration-300';
    const orientationClasses = this.orientation() === 'vertical'
      ? 'w-0.5 h-12 ml-5 my-2'
      : 'h-0.5 flex-1 mx-4';

    // Connector is colored if both current and next steps are completed
    const statusClasses = (currentStep.status === 'completed' && nextStep.status !== 'upcoming')
      ? 'bg-brand-primary'
      : 'bg-ui-border dark:bg-ui-border-dark';

    return `${baseClasses} ${orientationClasses} ${statusClasses}`;
  }

  /**
   * Check if step has custom icon SVG
   */
  hasCustomIcon(step: WizardStep): boolean {
    return !!step.icon;
  }

  /**
   * Check if step should show number
   */
  shouldShowNumber(step: WizardStep): boolean {
    return !this.hasCustomIcon(step) && step.status !== 'completed';
  }
}

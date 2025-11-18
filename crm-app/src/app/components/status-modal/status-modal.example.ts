/**
 * Status Modal Component - Usage Examples
 *
 * This file demonstrates various use cases for the StatusModalComponent
 */

import { Component, signal } from '@angular/core';
import { StatusModalComponent, ModalButton, ModalStatus } from './status-modal.component';

@Component({
  selector: 'app-status-modal-example',
  imports: [StatusModalComponent],
  template: `
    <div class="p-8 space-y-4">
      <h1 class="text-3xl font-bold mb-8">Status Modal Examples</h1>

      <!-- Trigger Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          (click)="showSuccessModal()"
          class="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          Show Success Modal
        </button>

        <button
          (click)="showErrorModal()"
          class="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Show Error Modal
        </button>

        <button
          (click)="showWarningModal()"
          class="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          Show Warning Modal
        </button>

        <button
          (click)="showInfoModal()"
          class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Show Info Modal
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <button
          (click)="showConfirmationModal()"
          class="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Show Confirmation Modal
        </button>

        <button
          (click)="showCustomModal()"
          class="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Show Custom Icon Modal
        </button>

        <button
          (click)="showLargeModal()"
          class="px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Show Large Modal
        </button>

        <button
          (click)="showSmallModal()"
          class="px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Show Small Modal
        </button>
      </div>

      <!-- Success Modal -->
      <app-status-modal
        [isOpen]="isSuccessOpen()"
        status="success"
        title="Payment Successful!"
        description="Your payment has been processed successfully. You will receive a confirmation email shortly."
        [buttons]="successButtons"
        (modalClose)="closeSuccessModal()"
      />

      <!-- Error Modal -->
      <app-status-modal
        [isOpen]="isErrorOpen()"
        status="error"
        title="Payment Failed"
        description="We couldn't process your payment. Please check your card details and try again."
        [buttons]="errorButtons"
        (modalClose)="closeErrorModal()"
      />

      <!-- Warning Modal -->
      <app-status-modal
        [isOpen]="isWarningOpen()"
        status="warning"
        title="Action Required"
        description="Your subscription will expire in 3 days. Please renew to continue enjoying our services."
        [buttons]="warningButtons"
        (modalClose)="closeWarningModal()"
      />

      <!-- Info Modal -->
      <app-status-modal
        [isOpen]="isInfoOpen()"
        status="info"
        title="New Features Available"
        description="We've added new features to improve your experience. Check out what's new!"
        [buttons]="infoButtons"
        (modalClose)="closeInfoModal()"
      />

      <!-- Confirmation Modal -->
      <app-status-modal
        [isOpen]="isConfirmOpen()"
        status="warning"
        title="Delete Account?"
        description="This action cannot be undone. All your data will be permanently deleted."
        [buttons]="confirmButtons"
        [closeOnBackdropClick]="false"
        (modalClose)="closeConfirmModal()"
      />

      <!-- Custom Icon Modal -->
      <app-status-modal
        [isOpen]="isCustomOpen()"
        status="success"
        title="Welcome Aboard!"
        description="Your account has been created successfully. Let's get started!"
        [customIcon]="customIcon"
        [buttons]="customButtons"
        (modalClose)="closeCustomModal()"
      />

      <!-- Large Modal -->
      <app-status-modal
        [isOpen]="isLargeOpen()"
        status="info"
        size="lg"
        title="Terms and Conditions Updated"
        description="We've updated our terms and conditions. Please review the changes before continuing to use our service. The main updates include enhanced privacy protection, clearer data usage policies, and new user rights."
        [buttons]="largeButtons"
        (modalClose)="closeLargeModal()"
      />

      <!-- Small Modal -->
      <app-status-modal
        [isOpen]="isSmallOpen()"
        status="success"
        size="sm"
        title="Saved!"
        [buttons]="smallButtons"
        (modalClose)="closeSmallModal()"
      />
    </div>
  `
})
export class StatusModalExampleComponent {
  // Modal open states
  isSuccessOpen = signal(false);
  isErrorOpen = signal(false);
  isWarningOpen = signal(false);
  isInfoOpen = signal(false);
  isConfirmOpen = signal(false);
  isCustomOpen = signal(false);
  isLargeOpen = signal(false);
  isSmallOpen = signal(false);

  // Success Modal Buttons
  successButtons: ModalButton[] = [
    {
      id: 'view-receipt',
      label: 'View Receipt',
      variant: 'outline',
      action: () => {
        console.log('View receipt clicked');
        this.closeSuccessModal();
      }
    },
    {
      id: 'done',
      label: 'Done',
      variant: 'primary',
      action: () => this.closeSuccessModal()
    }
  ];

  // Error Modal Buttons
  errorButtons: ModalButton[] = [
    {
      id: 'contact-support',
      label: 'Contact Support',
      variant: 'outline',
      action: () => {
        console.log('Contact support clicked');
        this.closeErrorModal();
      }
    },
    {
      id: 'try-again',
      label: 'Try Again',
      variant: 'primary',
      action: () => {
        console.log('Retrying payment...');
        this.closeErrorModal();
      }
    }
  ];

  // Warning Modal Buttons
  warningButtons: ModalButton[] = [
    {
      id: 'remind-later',
      label: 'Remind Me Later',
      variant: 'ghost',
      action: () => this.closeWarningModal()
    },
    {
      id: 'renew-now',
      label: 'Renew Now',
      variant: 'primary',
      action: () => {
        console.log('Renew subscription clicked');
        this.closeWarningModal();
      }
    }
  ];

  // Info Modal Buttons
  infoButtons: ModalButton[] = [
    {
      id: 'learn-more',
      label: 'Learn More',
      variant: 'primary',
      action: () => {
        console.log('Learn more clicked');
        this.closeInfoModal();
      },
      icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>`
    }
  ];

  // Confirmation Modal Buttons
  confirmButtons: ModalButton[] = [
    {
      id: 'cancel',
      label: 'Cancel',
      variant: 'outline',
      action: () => this.closeConfirmModal()
    },
    {
      id: 'delete',
      label: 'Delete Account',
      variant: 'primary',
      action: () => {
        console.log('Account deleted');
        this.closeConfirmModal();
      }
    }
  ];

  // Custom Icon
  customIcon = `<svg class="size-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
  </svg>`;

  // Custom Modal Buttons
  customButtons: ModalButton[] = [
    {
      id: 'get-started',
      label: 'Get Started',
      variant: 'primary',
      action: () => {
        console.log('Get started clicked');
        this.closeCustomModal();
      }
    }
  ];

  // Large Modal Buttons
  largeButtons: ModalButton[] = [
    {
      id: 'decline',
      label: 'Decline',
      variant: 'outline',
      action: () => this.closeLargeModal()
    },
    {
      id: 'accept',
      label: 'Accept',
      variant: 'primary',
      action: () => {
        console.log('Terms accepted');
        this.closeLargeModal();
      }
    }
  ];

  // Small Modal Buttons
  smallButtons: ModalButton[] = [
    {
      id: 'ok',
      label: 'OK',
      variant: 'primary',
      action: () => this.closeSmallModal()
    }
  ];

  // Modal control methods
  showSuccessModal() { this.isSuccessOpen.set(true); }
  closeSuccessModal() { this.isSuccessOpen.set(false); }

  showErrorModal() { this.isErrorOpen.set(true); }
  closeErrorModal() { this.isErrorOpen.set(false); }

  showWarningModal() { this.isWarningOpen.set(true); }
  closeWarningModal() { this.isWarningOpen.set(false); }

  showInfoModal() { this.isInfoOpen.set(true); }
  closeInfoModal() { this.isInfoOpen.set(false); }

  showConfirmationModal() { this.isConfirmOpen.set(true); }
  closeConfirmModal() { this.isConfirmOpen.set(false); }

  showCustomModal() { this.isCustomOpen.set(true); }
  closeCustomModal() { this.isCustomOpen.set(false); }

  showLargeModal() { this.isLargeOpen.set(true); }
  closeLargeModal() { this.isLargeOpen.set(false); }

  showSmallModal() { this.isSmallOpen.set(true); }
  closeSmallModal() { this.isSmallOpen.set(false); }
}

/**
 * USAGE PATTERN: Simple Alert
 */
export class SimpleAlertExample {
  showAlert = signal(false);

  alertButtons: ModalButton[] = [
    {
      id: 'ok',
      label: 'OK',
      variant: 'primary',
      action: () => this.showAlert.set(false)
    }
  ];

  // Template:
  // <app-status-modal
  //   [isOpen]="showAlert()"
  //   status="success"
  //   title="Success!"
  //   description="Your changes have been saved."
  //   [buttons]="alertButtons"
  //   (modalClose)="showAlert.set(false)"
  // />
}

/**
 * USAGE PATTERN: Async Operation
 */
export class AsyncOperationExample {
  isProcessing = signal(false);
  showResultModal = signal(false);
  operationStatus = signal<ModalStatus>('info');
  resultTitle = signal('');
  resultDescription = signal('');

  async performOperation() {
    this.isProcessing.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      this.operationStatus.set('success');
      this.resultTitle.set('Operation Successful');
      this.resultDescription.set('Your request has been processed successfully.');
    } catch (error) {
      // Error
      this.operationStatus.set('error');
      this.resultTitle.set('Operation Failed');
      this.resultDescription.set('Something went wrong. Please try again.');
    } finally {
      this.isProcessing.set(false);
      this.showResultModal.set(true);
    }
  }

  resultButtons: ModalButton[] = [
    {
      id: 'close',
      label: 'Close',
      variant: 'primary',
      action: () => this.showResultModal.set(false)
    }
  ];

  // Template:
  // <app-status-modal
  //   [isOpen]="showResultModal()"
  //   [status]="operationStatus()"
  //   [title]="resultTitle()"
  //   [description]="resultDescription()"
  //   [buttons]="resultButtons"
  //   (modalClose)="showResultModal.set(false)"
  // />
}

# Status Modal Component

A modern, animated modal dialog component for displaying status messages with beautiful icon animations, customizable buttons, and full dark mode support.

## ✨ Features

- 🎬 **Animated Status Icons**: Each status type has unique, smooth animations
  - Success: Checkmark draw animation
  - Error: Shake with cross draw
  - Warning: Bounce with exclamation draw
  - Info: Scale in with circle draw
- 🎨 **Four Status Types**: Success, Error, Warning, Info
- 📱 **Responsive**: Adapts to all screen sizes
- 🌓 **Dark Mode**: Full dark mode support
- ⌨️ **Keyboard Navigation**: ESC key to close
- 🎯 **Customizable**: Buttons, sizes, icons, descriptions
- ♿ **Accessible**: ARIA-compliant, screen reader friendly
- 🎭 **Flexible Layout**: Small, medium, and large sizes
- 🔒 **Backdrop Control**: Optional backdrop click to close
- ⚡ **Performant**: Angular signals for optimal reactivity

## 📦 Installation

The component is located in your components directory:

```
components/
└── status-modal/
    ├── status-modal.component.ts
    ├── status-modal.component.html
    ├── status-modal.component.scss
    ├── status-modal.example.ts
    └── README.md
```

## 🚀 Basic Usage

### 1. Import the Component

```typescript
import { Component, signal } from '@angular/core';
import { StatusModalComponent, ModalButton } from './components/status-modal/status-modal.component';

@Component({
  selector: 'app-my-component',
  imports: [StatusModalComponent],
  // ...
})
export class MyComponent {
  isModalOpen = signal(false);

  modalButtons: ModalButton[] = [
    {
      id: 'close',
      label: 'Close',
      variant: 'primary',
      action: () => this.isModalOpen.set(false)
    }
  ];
}
```

### 2. Use in Template

```html
<!-- Trigger Button -->
<button (click)="isModalOpen.set(true)">
  Show Modal
</button>

<!-- Modal -->
<app-status-modal
  [isOpen]="isModalOpen()"
  status="success"
  title="Success!"
  description="Your changes have been saved successfully."
  [buttons]="modalButtons"
  (modalClose)="isModalOpen.set(false)"
/>
```

## 📖 API Reference

### Component Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls modal visibility |
| `status` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Modal status type |
| `title` | `string` | **required** | Modal title text |
| `description` | `string` | `undefined` | Optional description text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Modal size |
| `buttons` | `ModalButton[]` | `[]` | Action buttons array |
| `showCloseButton` | `boolean` | `true` | Show close button in top-right |
| `closeOnBackdropClick` | `boolean` | `true` | Close modal when backdrop is clicked |
| `closeOnEscape` | `boolean` | `true` | Close modal when ESC key is pressed |
| `customIcon` | `string` | `undefined` | Custom SVG icon (overrides status icon) |

### Component Outputs

| Event | Type | Description |
|-------|------|-------------|
| `modalClose` | `void` | Emitted when modal is closed |
| `modalOpen` | `void` | Emitted when modal is opened |

### ModalButton Interface

```typescript
interface ModalButton {
  id: string;              // Unique button identifier
  label: string;           // Button text
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Button style
  action: () => void;      // Click handler function
  icon?: string;           // Optional SVG icon
  disabled?: boolean;      // Disable button
}
```

## 🎨 Status Types & Animations

### Success
- **Color**: Emerald green
- **Icon**: Checkmark
- **Animation**: Checkmark draw from left to right
- **Use Case**: Successful operations, confirmations

```html
<app-status-modal
  [isOpen]="isOpen()"
  status="success"
  title="Payment Successful!"
  description="Your payment has been processed."
  (modalClose)="close()"
/>
```

### Error
- **Color**: Red
- **Icon**: X mark
- **Animation**: Shake with cross draw
- **Use Case**: Failed operations, critical errors

```html
<app-status-modal
  [isOpen]="isOpen()"
  status="error"
  title="Payment Failed"
  description="We couldn't process your payment."
  (modalClose)="close()"
/>
```

### Warning
- **Color**: Amber/Yellow
- **Icon**: Exclamation in triangle
- **Animation**: Bounce with path draw
- **Use Case**: Warnings, confirmations needed

```html
<app-status-modal
  [isOpen]="isOpen()"
  status="warning"
  title="Delete Account?"
  description="This action cannot be undone."
  (modalClose)="close()"
/>
```

### Info
- **Color**: Blue
- **Icon**: Information circle
- **Animation**: Scale in with path draw
- **Use Case**: Information, updates, tips

```html
<app-status-modal
  [isOpen]="isOpen()"
  status="info"
  title="New Features"
  description="Check out what's new!"
  (modalClose)="close()"
/>
```

## 📋 Common Examples

### Example 1: Simple Alert

```typescript
export class AlertExample {
  showAlert = signal(false);

  alertButtons: ModalButton[] = [
    {
      id: 'ok',
      label: 'OK',
      variant: 'primary',
      action: () => this.showAlert.set(false)
    }
  ];
}
```

```html
<app-status-modal
  [isOpen]="showAlert()"
  status="success"
  title="Saved!"
  description="Your changes have been saved."
  [buttons]="alertButtons"
  (modalClose)="showAlert.set(false)"
/>
```

### Example 2: Confirmation Dialog

```typescript
export class ConfirmExample {
  showConfirm = signal(false);

  confirmButtons: ModalButton[] = [
    {
      id: 'cancel',
      label: 'Cancel',
      variant: 'outline',
      action: () => this.showConfirm.set(false)
    },
    {
      id: 'confirm',
      label: 'Delete',
      variant: 'primary',
      action: () => {
        this.deleteItem();
        this.showConfirm.set(false);
      }
    }
  ];

  deleteItem() {
    console.log('Item deleted');
  }
}
```

```html
<app-status-modal
  [isOpen]="showConfirm()"
  status="warning"
  title="Delete Item?"
  description="This action cannot be undone."
  [buttons]="confirmButtons"
  [closeOnBackdropClick]="false"
  (modalClose)="showConfirm.set(false)"
/>
```

### Example 3: Async Operation Result

```typescript
export class AsyncExample {
  showResult = signal(false);
  operationStatus = signal<ModalStatus>('info');

  async performOperation() {
    try {
      await this.apiCall();
      this.operationStatus.set('success');
    } catch (error) {
      this.operationStatus.set('error');
    } finally {
      this.showResult.set(true);
    }
  }

  resultButtons: ModalButton[] = [
    {
      id: 'close',
      label: 'Close',
      variant: 'primary',
      action: () => this.showResult.set(false)
    }
  ];
}
```

```html
<app-status-modal
  [isOpen]="showResult()"
  [status]="operationStatus()"
  [title]="operationStatus() === 'success' ? 'Success!' : 'Failed'"
  [description]="operationStatus() === 'success' ? 'Operation completed.' : 'Operation failed.'"
  [buttons]="resultButtons"
  (modalClose)="showResult.set(false)"
/>
```

### Example 4: Custom Icon

```typescript
export class CustomIconExample {
  showCustom = signal(false);

  customIcon = `<svg class="size-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
  </svg>`;

  customButtons: ModalButton[] = [
    {
      id: 'claim',
      label: 'Claim Reward',
      variant: 'primary',
      action: () => this.showCustom.set(false),
      icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
      </svg>`
    }
  ];
}
```

```html
<app-status-modal
  [isOpen]="showCustom()"
  status="success"
  title="Congratulations!"
  description="You've earned a special reward!"
  [customIcon]="customIcon"
  [buttons]="customButtons"
  (modalClose)="showCustom.set(false)"
/>
```

### Example 5: Multiple Buttons

```typescript
export class MultiButtonExample {
  showMulti = signal(false);

  multiButtons: ModalButton[] = [
    {
      id: 'later',
      label: 'Remind Me Later',
      variant: 'ghost',
      action: () => this.remindLater()
    },
    {
      id: 'skip',
      label: 'Skip',
      variant: 'outline',
      action: () => this.showMulti.set(false)
    },
    {
      id: 'update',
      label: 'Update Now',
      variant: 'primary',
      action: () => this.updateNow()
    }
  ];

  remindLater() {
    console.log('Will remind later');
    this.showMulti.set(false);
  }

  updateNow() {
    console.log('Updating...');
    this.showMulti.set(false);
  }
}
```

```html
<app-status-modal
  [isOpen]="showMulti()"
  status="info"
  title="Update Available"
  description="A new version is available. Update now to get the latest features."
  [buttons]="multiButtons"
  (modalClose)="showMulti.set(false)"
/>
```

## 🎭 Size Variants

### Small (`sm`)
- **Max Width**: 384px (24rem)
- **Best For**: Quick confirmations, simple alerts
- **Icon Size**: 48px
- **Title**: text-lg

### Medium (`md`) - Default
- **Max Width**: 448px (28rem)
- **Best For**: Standard modals, most use cases
- **Icon Size**: 64px
- **Title**: text-2xl

### Large (`lg`)
- **Max Width**: 672px (42rem)
- **Best For**: Detailed information, long descriptions
- **Icon Size**: 80px
- **Title**: text-3xl

## 🎨 Button Variants

### Primary
- **Style**: Solid color, white text
- **Use**: Main action, confirmation

### Secondary
- **Style**: Light background, dark text
- **Use**: Alternative actions

### Outline
- **Style**: Border only, transparent background
- **Use**: Secondary actions, cancel

### Ghost
- **Style**: No background, minimal styling
- **Use**: Dismiss, close, optional actions

## ♿ Accessibility

The component follows WCAG 2.1 AA guidelines:

- ✅ **Keyboard Navigation**: ESC to close, Tab to navigate buttons
- ✅ **ARIA Labels**: Proper role, aria-modal, aria-labelledby
- ✅ **Focus Management**: Traps focus within modal
- ✅ **Screen Readers**: Descriptive labels and announcements
- ✅ **Color Contrast**: Meets AA standards for all status types
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`

## 🎬 Animation Details

Each status type has unique animations:

| Status | Icon Animation | Container Animation | Duration |
|--------|---------------|---------------------|----------|
| Success | Checkmark draw | None | 0.5s |
| Error | Cross draw + Shake | Shake | 0.4s |
| Warning | Path draw + Bounce | Bounce | 0.6s |
| Info | Circle draw + Scale | Scale in | 0.4s |

All animations respect the `prefers-reduced-motion` media query.

## 🌓 Dark Mode

The component automatically adapts to dark mode using semantic color tokens from your Tailwind config:

- Background: `ui-bg-primary` / `ui-bg-primary-dark`
- Text: `ui-text-primary` / `ui-text-primary-dark`
- Status colors use dark variants automatically

## 💡 Best Practices

1. **Keep titles concise**: 2-5 words maximum
2. **Descriptions should be brief**: 1-2 sentences
3. **Limit buttons**: 1-3 buttons work best
4. **Use appropriate status**: Match status to the message type
5. **Primary action on right**: Follow common UX patterns
6. **Don't overuse**: Reserve for important messages
7. **Close mechanisms**: Provide multiple ways to close (X, button, ESC)
8. **Async feedback**: Always show result of async operations

## 🔧 Advanced Usage

### Preventing Accidental Closes

```html
<app-status-modal
  [isOpen]="isOpen()"
  status="warning"
  title="Unsaved Changes"
  [closeOnBackdropClick]="false"
  [closeOnEscape]="false"
  [showCloseButton]="false"
  [buttons]="buttons"
/>
```

### Dynamic Status

```typescript
status = computed(() => {
  if (this.error()) return 'error';
  if (this.warning()) return 'warning';
  return 'success';
});
```

### Chaining Modals

```typescript
closeFirstModal() {
  this.firstModal.set(false);
  setTimeout(() => this.secondModal.set(true), 300);
}
```

## 🐛 Troubleshooting

**Modal doesn't open**: Check that `isOpen` is properly bound to a signal or reactive value.

**Animations not working**: Ensure Angular animations are enabled in your app config.

**Backdrop not clickable**: Check `closeOnBackdropClick` is set to `true`.

**ESC key not working**: Verify `closeOnEscape` is `true` and component is properly mounted.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔗 Related Components

- `BadgeComponent` - For inline status indicators
- `ButtonComponent` - For standalone buttons
- `NotificationCard` - For non-blocking notifications

## 📄 License

Part of the CRM App component library.

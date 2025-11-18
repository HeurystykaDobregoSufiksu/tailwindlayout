# Progress Wizard Component

A modern, accessible progress wizard component for Angular applications with full dark mode support and flexible layout options.

## Features

- ✨ **Dual Orientation**: Horizontal and vertical layouts
- 🎨 **Modern Design**: Uses project's Tailwind configuration for consistent styling
- 🌓 **Dark Mode**: Full dark mode support with semantic color tokens
- 📱 **Responsive**: Adapts to different screen sizes
- ♿ **Accessible**: ARIA-compliant with keyboard navigation support
- 🎭 **Customizable**: Custom icons, descriptions, and compact mode
- ⚡ **Performant**: Built with Angular signals for optimal reactivity
- 🎯 **Type Safe**: Full TypeScript support with exported interfaces

## Installation

The component is already created in your components directory:

```
components/
└── progress-wizard/
    ├── progress-wizard.component.ts
    ├── progress-wizard.component.html
    ├── progress-wizard.component.scss
    ├── progress-wizard.example.ts
    └── README.md
```

## Basic Usage

### 1. Import the Component

```typescript
import { ProgressWizardComponent, WizardStep, StepStatus } from './components/progress-wizard/progress-wizard.component';

@Component({
  selector: 'app-my-component',
  imports: [ProgressWizardComponent],
  // ...
})
```

### 2. Define Your Steps

```typescript
export class MyComponent {
  wizardSteps: WizardStep[] = [
    {
      id: 'step-1',
      label: 'Account Setup',
      description: 'Create your account',
      status: 'completed'
    },
    {
      id: 'step-2',
      label: 'Profile Information',
      description: 'Add your details',
      status: 'current'
    },
    {
      id: 'step-3',
      label: 'Verification',
      description: 'Verify your email',
      status: 'upcoming'
    }
  ];
}
```

### 3. Use in Template

```html
<!-- Horizontal (default) -->
<app-progress-wizard [steps]="wizardSteps" />

<!-- Vertical -->
<app-progress-wizard [steps]="wizardSteps" orientation="vertical" />

<!-- Compact mode -->
<app-progress-wizard [steps]="wizardSteps" [compact]="true" />
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | `WizardStep[]` | **required** | Array of wizard steps to display |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the wizard |
| `showConnectors` | `boolean` | `true` | Show connecting lines between steps |
| `showStepNumbers` | `boolean` | `true` | Show step numbers in markers |
| `compact` | `boolean` | `false` | Use smaller sizing for compact layouts |

### WizardStep Interface

```typescript
interface WizardStep {
  id: string;              // Unique identifier
  label: string;           // Step title
  description?: string;    // Optional description text
  status: StepStatus;      // Step state
  icon?: string;           // Optional custom SVG icon
}
```

### StepStatus Type

```typescript
type StepStatus = 'completed' | 'current' | 'upcoming';
```

## Examples

### Example 1: Order Tracking (Horizontal)

```typescript
orderSteps: WizardStep[] = [
  {
    id: 'placed',
    label: 'Order Placed',
    description: 'We received your order',
    status: 'completed'
  },
  {
    id: 'processing',
    label: 'Processing',
    description: 'Preparing your items',
    status: 'completed'
  },
  {
    id: 'shipped',
    label: 'Shipped',
    description: 'On the way to you',
    status: 'current'
  },
  {
    id: 'delivered',
    label: 'Delivered',
    description: 'Enjoy your purchase',
    status: 'upcoming'
  }
];
```

```html
<app-progress-wizard [steps]="orderSteps" orientation="horizontal" />
```

### Example 2: Multi-step Form (Vertical)

```typescript
formSteps: WizardStep[] = [
  {
    id: 'personal',
    label: 'Personal Details',
    status: 'completed'
  },
  {
    id: 'address',
    label: 'Shipping Address',
    status: 'current'
  },
  {
    id: 'payment',
    label: 'Payment Method',
    status: 'upcoming'
  },
  {
    id: 'review',
    label: 'Review Order',
    status: 'upcoming'
  }
];
```

```html
<app-progress-wizard
  [steps]="formSteps"
  orientation="vertical"
/>
```

### Example 3: Custom Icons

```typescript
stepsWithIcons: WizardStep[] = [
  {
    id: 'user',
    label: 'User Info',
    status: 'completed',
    icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>`
  },
  {
    id: 'settings',
    label: 'Settings',
    status: 'current',
    icon: `<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>`
  }
];
```

### Example 4: Compact Mode for Sidebars

```html
<app-progress-wizard
  [steps]="steps"
  orientation="vertical"
  [compact]="true"
  [showConnectors]="true"
/>
```

## Dynamic Updates

You can dynamically update step statuses:

```typescript
export class MyComponent {
  steps = signal<WizardStep[]>([...]);

  completeStep(stepId: string) {
    this.steps.update(steps =>
      steps.map(step =>
        step.id === stepId
          ? { ...step, status: 'completed' }
          : step
      )
    );
  }

  goToStep(stepId: string) {
    this.steps.update(steps => {
      const stepIndex = steps.findIndex(s => s.id === stepId);
      return steps.map((step, index) => ({
        ...step,
        status: index < stepIndex
          ? 'completed'
          : index === stepIndex
          ? 'current'
          : 'upcoming'
      }));
    });
  }
}
```

## Styling & Theming

The component uses your project's Tailwind configuration:

- **Brand Colors**: `brand-primary`, `brand-primary-dark`
- **Semantic Colors**: `ui-text-*`, `ui-bg-*`, `ui-border-*`
- **Status Colors**: `status-success`, `status-warning`, `status-error`
- **Dark Mode**: Automatic dark mode support via `dark:` variants

### Customizing Colors

The component automatically adapts to your theme. To customize:

1. Modify `tailwind.config.js` brand colors
2. Component will use the updated colors automatically

## Accessibility

The component follows WCAG 2.1 AA guidelines:

- ✅ Proper color contrast ratios
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus indicators
- ✅ Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Related Components

- `BadgeComponent` - For status indicators
- `ButtonComponent` - For navigation controls
- `IconButtonComponent` - For step actions

## Tips & Best Practices

1. **Keep labels concise**: Use 2-4 words for step labels
2. **Use descriptions wisely**: Add descriptions for complex steps
3. **Limit step count**: 3-7 steps work best for horizontal, more for vertical
4. **Status progression**: Only one step should be 'current' at a time
5. **Custom icons**: Use consistent icon style (outline or solid, not mixed)
6. **Responsive design**: Consider using vertical orientation on mobile

## License

Part of the CRM App component library.

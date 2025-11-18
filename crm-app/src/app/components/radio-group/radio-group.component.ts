import { Component, input, signal, computed, ContentChildren, QueryList, AfterContentInit, forwardRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-radio-group',
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  // Primitive inputs only (non-form related)
  name = input.required<string>();
  orientation = input<RadioGroupOrientation>('vertical');

  // Form control state
  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Content projection
  @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;

  // Computed values
  containerClasses = computed<string>(() => {
    const baseClasses = 'flex gap-3';
    const orientationClasses = this.orientation() === 'horizontal' ? 'flex-row items-center' : 'flex-col';
    return `${baseClasses} ${orientationClasses}`;
  });

  constructor() {
    // Update radio buttons when value changes
    effect(() => {
      const currentValue = this.value();
      const disabled = this.isDisabled();
      this.radioButtons?.forEach((radio) => {
        radio.updateFromGroup(currentValue, disabled);
      });
    });
  }

  ngAfterContentInit(): void {
    // Subscribe to each radio button's selection
    this.radioButtons.forEach((radio) => {
      radio.selected.subscribe((value: string) => {
        this.onRadioSelect(value);
      });
    });

    // Set initial state for all radio buttons
    this.updateRadioButtons();
  }

  onRadioSelect(value: string): void {
    if (!this.isDisabled()) {
      this.value.set(value);
      this.onChange(value);
      this.onTouched();
      this.updateRadioButtons();
    }
  }

  private updateRadioButtons(): void {
    const selected = this.value();
    const disabled = this.isDisabled();
    this.radioButtons?.forEach((radio) => {
      radio.updateFromGroup(selected, disabled);
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value ?? '');
    this.updateRadioButtons();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    this.updateRadioButtons();
  }
}

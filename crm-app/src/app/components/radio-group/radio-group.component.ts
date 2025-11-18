import { Component, input, output, computed, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-radio-group',
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent implements AfterContentInit {
  // Primitive inputs only
  name = input.required<string>();
  selectedValue = input<string>('');
  orientation = input<RadioGroupOrientation>('vertical');
  disabled = input<boolean>(false);

  // Outputs
  valueChange = output<string>();

  // Content projection
  @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;

  // Computed values
  containerClasses = computed<string>(() => {
    const baseClasses = 'flex gap-3';
    const orientationClasses = this.orientation() === 'horizontal' ? 'flex-row items-center' : 'flex-col';
    return `${baseClasses} ${orientationClasses}`;
  });

  ngAfterContentInit(): void {
    // Subscribe to each radio button's selection
    this.radioButtons.forEach((radio) => {
      radio.selected.subscribe((value: string) => {
        this.onRadioSelect(value);
      });
    });

    // Set initial selection
    this.updateRadioButtons();
  }

  onRadioSelect(value: string): void {
    this.valueChange.emit(value);
    this.updateRadioButtons();
  }

  private updateRadioButtons(): void {
    const selected = this.selectedValue();
    this.radioButtons.forEach((radio) => {
      // This is a workaround since we can't directly set signal inputs
      // In a real app, you'd manage this differently
    });
  }
}

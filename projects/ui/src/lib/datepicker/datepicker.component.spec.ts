import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './datepicker.component';

@Component({
  selector: 'datepicker-host',
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  template: `
    <ui-datepicker
      [placeholder]="placeholder()"
      [min]="min()"
      [max]="max()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
    />
  `,
})
class DatePickerHost {
  readonly value = signal<string | null>(null);
  readonly placeholder = signal('Elige una fecha');
  readonly min = signal('');
  readonly max = signal('');
}

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerHost>;
  let host: DatePickerHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DatePickerHost] }).compileComponents();
    fixture = TestBed.createComponent(DatePickerHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function input(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
  }

  function comp(): DatePickerComponent {
    return fixture.debugElement.query(By.directive(DatePickerComponent))
      .componentInstance as DatePickerComponent;
  }

  function dayButtons(): HTMLButtonElement[] {
    return Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
  }

  it('shows the placeholder when empty', () => {
    expect(input().placeholder).toBe('Elige una fecha');
    expect(input().value).toBe('');
  });

  it('reflects a programmatic value as dd/mm/yyyy', () => {
    comp().writeValue('2026-08-15');
    fixture.detectChanges();
    expect(input().value).toBe('15/08/2026');
  });

  it('opens the calendar on focus and selects a day', () => {
    input().dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect((comp() as any).isOpen()).toBe(true);
    const day = dayButtons().find((b) => b.textContent?.trim() === '15');
    expect(day).toBeTruthy();
    day?.click();
    fixture.detectChanges();
    expect(host.value()).toBe(
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-15`,
    );
    expect((comp() as any).isOpen()).toBe(false);
  });

  it('does not emit when the selected day is out of range', () => {
    host.min.set('2026-08-10');
    host.max.set('2026-08-20');
    fixture.detectChanges();
    input().dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const outOfRange = dayButtons().find((b) => b.textContent?.trim() === '5');
    expect(outOfRange?.disabled).toBe(true);
  });

  it('clears the value when writeValue receives null', () => {
    comp().writeValue('2026-08-15');
    fixture.detectChanges();
    comp().writeValue(null);
    fixture.detectChanges();
    expect(input().value).toBe('');
  });
});

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input() organization = '';
  @Input() token = '';
  @Input() isLoading = false;
  @Input() formValid = false;
  
  @Output() organizationChange = new EventEmitter<string>();
  @Output() tokenChange = new EventEmitter<string>();
  @Output() searchTriggered = new EventEmitter<void>();

  onOrganizationChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.organizationChange.emit(target.value);
  }

  onTokenChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.tokenChange.emit(target.value);
  }

  onSearch(): void {
    this.searchTriggered.emit();
  }
}

import { Component, Input, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowSummaryService, WorkflowSummary } from './workflow-summary.service';

@Component({
  selector: 'app-workflow-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow-summary.component.html',
  styleUrls: ['./workflow-summary.component.css']
})
export class WorkflowSummaryComponent {
  private summaryService = inject(WorkflowSummaryService);

  @Input() organization = '';
  @Input() token = '';
  @Input() refreshTrigger = 0;
  
  summary = signal<WorkflowSummary>({ success: 0, pending: 0, failed: 0 });
  isLoading = signal<boolean>(false);

  constructor() {
    // Effect to load summary when inputs change
    effect(() => {
      const org = this.organization;
      const tkn = this.token;
      const trigger = this.refreshTrigger;
      
      if (org && tkn && trigger > 0) {
        void this.loadSummary(org, tkn);
      }
    });
  }

  private async loadSummary(organization: string, token: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const summary = await this.summaryService.getSummary(organization, token);
      this.summary.set(summary);
    } catch (error) {
      console.error('Failed to load workflow summary', error);
      this.summary.set({ success: 0, pending: 0, failed: 0 });
    } finally {
      this.isLoading.set(false);
    }
  }
}

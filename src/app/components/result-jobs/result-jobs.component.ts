import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-result-jobs',
  imports: [CommonModule],
  templateUrl: './result-jobs.component.html',
  styleUrl: './result-jobs.component.css'
})
export class ResultJobsComponent {
  constructor(private readonly router: Router) {}
  @Input() jobs: Job[] = [];
  redirectToJobDetails(jobId: number) {
    this.router.navigate(['/job-details', jobId]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../../interfaces/job.interface';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  job: Job | undefined;
  ngOnInit(): void {
    this.getDetails();
  }
  constructor(private readonly route: ActivatedRoute,
    private readonly jobService: JobsService
  ) {}

  getDetails() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobDetail(Number(jobId)).subscribe(job => {
        this.job = job;
      });
    }
  }
}

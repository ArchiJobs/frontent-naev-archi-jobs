import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterJobsComponent } from '../../../components/filter-jobs/filter-jobs.component';
import { ResultJobsComponent } from '../../../components/result-jobs/result-jobs.component';
import { Job } from '../../../interfaces/job.interface';
import { Category } from '../../../interfaces/category.interface';
import { JobFilters } from '../../../interfaces/job-filters.interface';
import { JobsService } from '../../../services/jobs.service';
import { Location } from '../../../interfaces/location.interface';

@Component({
  selector: 'app-search-jobs',
  imports: [CommonModule, FilterJobsComponent, ResultJobsComponent],
  templateUrl: './search-jobs.component.html',
  styleUrl: './search-jobs.component.css',
})
export class SearchJobsComponent {
  jobs: Job[] = [];
  categories: Category[] = [];
  locations: Location[] = [];
  filters: JobFilters | null = null;

  constructor(private readonly jobsService: JobsService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadLocations();
    this.loadFilters();
    this.searchJobs();
  }

  searchJobs(query: string = '', location: string = '', category: string = '', salaryRange: string = ''): void {
    this.jobsService.searchJobs(query, location, category, salaryRange, 10, 0, 1).subscribe((response: Job[]) => {
      this.jobs = response;
    });
  }

  loadCategories(): void {
    this.jobsService.getCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  loadLocations(): void {
    this.jobsService.getLocations().subscribe((response: Location[]) => {
      this.locations = response;
    });
  }

  loadFilters(): void {
    this.jobsService.getJobFilters().subscribe((response: JobFilters) => {
      this.filters = response;
    });
  }
}

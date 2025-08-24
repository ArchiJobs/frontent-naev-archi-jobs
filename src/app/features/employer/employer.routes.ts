import { Routes } from '@angular/router';

// Employer Components
// import { EmployerDashboardComponent } from './dashboard/employer-dashboard.component';
// import { PostJobComponent } from './post-job/post-job.component';
// import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';

export const EMPLOYER_ROUTES: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: EmployerDashboardComponent },
  // { path: 'post-job', component: PostJobComponent },
  // { path: 'manage-jobs', component: ManageJobsComponent },
  
  // Temporal - will be implemented later
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

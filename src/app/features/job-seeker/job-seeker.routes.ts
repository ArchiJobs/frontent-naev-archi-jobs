import { Routes } from '@angular/router';

// Job Seeker Components
// import { JobSeekerDashboardComponent } from './dashboard/job-seeker-dashboard.component';
// import { MyApplicationsComponent } from './my-applications/my-applications.component';
// import { ProfileComponent } from './profile/profile.component';
// import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';

export const JOB_SEEKER_ROUTES: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: JobSeekerDashboardComponent },
  // { path: 'applications', component: MyApplicationsComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'saved-jobs', component: SavedJobsComponent },
  
  // Temporal - will be implemented later
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

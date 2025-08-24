import { Routes } from '@angular/router';

// Public Components (No Auth Required)
import { HomeComponent } from './home/home.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { PaymentsComponent } from './pricing/payments.component';

export const PUBLIC_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-jobs', component: SearchJobsComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: 'job-details', component: JobDetailsComponent }, // Temporal para desarrollo
  { path: 'about', component: AboutComponent },
  { path: 'pricing', component: PaymentsComponent },
  
  // Redirects
  { path: 'payments', redirectTo: 'pricing', pathMatch: 'full' }
];

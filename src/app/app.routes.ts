import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./features/public/public.routes').then(m => m.PUBLIC_ROUTES)
  },

  { 
    path: '', 
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  { 
    path: 'job-seeker', 
    loadChildren: () => import('./features/job-seeker/job-seeker.routes').then(m => m.JOB_SEEKER_ROUTES)
  },
 
  { 
    path: 'employer', 
    loadChildren: () => import('./features/employer/employer.routes').then(m => m.EMPLOYER_ROUTES)
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

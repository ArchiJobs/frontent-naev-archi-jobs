import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  quickSearchForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.quickSearchForm = this.fb.group({
      position: [''],
      location: ['']
    });
  }

  onQuickSearch(): void {
    const formValues = this.quickSearchForm.value;
    
    // Navegar a la página de trabajos con parámetros de búsqueda
    this.router.navigate(['/search-jobs'], {
      queryParams: {
        q: formValues.position || '',
        location: formValues.location || ''
      }
    });
  }

  onCategoryClick(category: string): void {
    // Navegar a la página de trabajos con categoría específica
    this.router.navigate(['/search-jobs'], {
      queryParams: {
        category: category
      }
    });
  }
}

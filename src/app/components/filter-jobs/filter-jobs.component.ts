import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category.interface';
import { Location } from '../../interfaces/location.interface';

@Component({
  selector: 'app-filter-jobs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-jobs.component.html',
  styleUrl: './filter-jobs.component.css'
})
export class FilterJobsComponent {
  @Input() categories: Category[] = [];
  @Input() locations: Location[] = [];

  searchForm!: FormGroup;
  areas = ['Arquitectura', 'Construcción', 'Diseño de Interiores']; 
  regiones = ['Región Metropolitana', 'Valparaíso', 'Biobío'];
  experiencias = ['Junior', 'Senior', 'Experto']; 

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
      area: [''],
      region: [''],
      experience: [''],
    });
  }

  searchJobs() {
    console.log(this.searchForm.value);
  }
}

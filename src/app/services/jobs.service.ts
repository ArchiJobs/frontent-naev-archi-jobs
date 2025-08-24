import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly baseUrl = 'http://localhost:8080/jobs';

  constructor(private readonly http: HttpClient) {}

  searchJobs(query: string, location: string, category: string, salaryRange: string, limit: number, offset: number, page: number): Observable<any> {
    const params = {
      query,
      location,
      category,
      salaryRange,
      limit: limit.toString(),
      offset: offset.toString(),
      page: page.toString()
    };

    return this.http.get(`${this.baseUrl}/searchJobs`, { params });
  }

  getJobDetail(id: number): Observable<any> {

    const params = { jobId: id.toString() };

    return this.http.get(`${this.baseUrl}/getJobDetail`, { params });

  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCategories`, {});
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLocations`, {});
  }

  getCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompanies`, {});
  }

  getJobFilters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getJobFilters`, {});
  }
}

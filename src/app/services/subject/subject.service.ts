import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get subject
  getSubjects(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/subject`;
    return lastValueFrom(this.http.get(url));
  }

  // create subject
  createSubject(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/subject`;
    return lastValueFrom(this.http.post(url, data));
  }

  // delete subject
  deleteSubject(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/subject/${id}`;
    return lastValueFrom(this.http.delete(url));
  }

  // create department subject
  createDepartmentSubject(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/departmentSubject`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get department subjects
  getDepartmentSubjects(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/departmentSubject`;
    return lastValueFrom(this.http.get(url));
  }
}
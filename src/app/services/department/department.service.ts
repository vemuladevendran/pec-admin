import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient, private settings: SettingsService) { }

  // get hod list

  getHods(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department/hod`;
    return lastValueFrom(this.http.get(url));
  }

  // create department

  createDepartment(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get department list

  getDepartmentDetails(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department`;
    return lastValueFrom(this.http.get(url));
  }

  // get department Details by id

  getDepartmentById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // delete department

  deleteDepartment(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department/${id}`;
    return lastValueFrom(this.http.delete(url));
  }

  // get sections
  getSections(departmentName:any, year: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/department/sections/${departmentName}/${year}`;
     const data = lastValueFrom(this.http.get(url));
     return data;
  }
}

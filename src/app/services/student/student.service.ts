import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get students
  getStudents(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/students`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // create student
  createStudent(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student`;
    return lastValueFrom(this.http.post(url, data));
  }

  // update student
  updateStudent(id: string, data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.put(url, data));
  }

  // get student by id
  getStudentById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // delete student
  deleteStudent(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}
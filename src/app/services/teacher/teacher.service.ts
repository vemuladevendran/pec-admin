import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get Teacher
  getTeachers(filters: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/teacher`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // create Teacher
  createTeacher(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/teacher`;
    return lastValueFrom(this.http.post(url, data));
  }

  // delete Teacher

  deleteTeacher(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/teacher/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}
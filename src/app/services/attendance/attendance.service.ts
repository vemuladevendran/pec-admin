import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // mark Attendance
  markAttendance(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/attendance`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get attendance details
  getAttendanceDetails(filters: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/attendance`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }
}

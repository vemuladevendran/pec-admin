import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // create timetable
  createTimeTable(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/time-table`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get timetable
  getTimeTable(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/time-table`;
    return lastValueFrom(this.http.get(url));
  }

}
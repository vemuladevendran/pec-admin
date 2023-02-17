import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterMarksService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  uploadExamMarks(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/semester-marks`;
    return lastValueFrom(this.http.post(url, data));
  };

  getSemesterMarks(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/semester-marks`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  };

  deleteMarks(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/semester-marks/${id}`;
    return lastValueFrom(this.http.delete(url));
  };
  
  getMarks(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  getMarksById(id: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks/${id}`;
    return lastValueFrom(this.http.get(url));
  }
}

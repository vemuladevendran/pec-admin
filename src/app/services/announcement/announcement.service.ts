import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  create(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/announcement`;
    return lastValueFrom(this.http.post(url, data));
  }

  getAnnouncements(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/announcement`;
    return lastValueFrom(this.http.get(url));
  }

  deleteAnnouncement(id:string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/announcement/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}

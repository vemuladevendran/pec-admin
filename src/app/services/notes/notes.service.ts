import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  uploadNotes(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/notes`;
    return lastValueFrom(this.http.post(url, data));
  }

  getNotes(filters: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/notes`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  deleteNotes(id: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/notes/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}
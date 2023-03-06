import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }
  createPlacement(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/placement`;
    return lastValueFrom(this.http.post(url, data));
  };

  updateStatus(id: any, data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/placement/${id}`;
    return lastValueFrom(this.http.put(url, data));
  };

  getPlacementDetails(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/placement`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  };

}
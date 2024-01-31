import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs loaded');
  }
  private apiKey: string = 've3JrpOLvAcmYzVGj22WJsOSxBmJS8le';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] = [];

  public gifList: Gif[] = [];

  private setLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if (!history) return;
    this._tagsHistory = JSON.parse(history);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.setLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search?`, {
        params,
      })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }

  deleteTag(tag: string): void {
    if (tag.length === 0) return;

    this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    this.setLocalStorage();
  }
}

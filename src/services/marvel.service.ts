import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private apiKey = '8fa531775996faa8d01426dbdba61b00';
  private privateKey = '292ddabe4f6472bd58598ca01c70ad3203c399ab';

  constructor(private http: HttpClient) {}

  getSuperheroes(): Observable<any> {
    const url = `${this.baseUrl}/characters`;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(
      timestamp + this.privateKey + this.apiKey
    ).toString();

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('ts', timestamp)
      .set('hash', hash);

    return this.http.get(url, { params });
  }

  getSuperheroById(id: number): Observable<any> {
    const url = `${this.baseUrl}/characters/${id}`;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(
      timestamp + this.privateKey + this.apiKey
    ).toString();

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('ts', timestamp)
      .set('hash', hash);

    return this.http.get(url, { params });
  }
}

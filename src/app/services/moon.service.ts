import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

// export interface Apod {
//   copyright: string;
//   date: string;
//   explanation: string;
//   media_type: string;
//   service_version: string;
//   title: string;
//   hdurl: string;
//   url: string;
// }

@Injectable({
  providedIn: 'root'
})
export class MoonService {
  private apiUrl = 'https://api.nasa.gov'; // Base URL de la API de NASA
  private apiKey = 'Nc2bNUaRqkbBLpzTxcEct08McovCqhIBnnvKoAoA'; // Clave de la API
  // private API_URL = `${this.apiUrl}/planetary/apod?api_key=${this.apiKey}`; // URL completa
  private API_URL = `${this.apiUrl}/planetary/apod?api_key=${this.apiKey}&count=10`;

  // console.log(API_URL);
  //  private apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5';
  
  // constructor(private http: HttpClient) { }
  // getApod(): Observable<Apod> {
  //   this.configUrl = '${this.apiUrl}/planetary/apod?api_key=${this.apiKey}count=5';
  //   const apod = this.http.get<Apod>(this.configUrl);
  //   return apod;
  // }





     constructor(private http: HttpClient) {}
  
     getAPOD(): Observable<any[]>{
      console.log(this.API_URL);

       return this.http.get<any[]>(this.API_URL).pipe( catchError((error) => { 
         console.error('Error al obtener datos APOD:', error); 
        return throwError(error); 
      })
   );
      // return this.http.get<any[]>(this.apiUrl);
    }
  
  }


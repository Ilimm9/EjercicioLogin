import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoonService {
// private apiUrl = 'https://api.nasa.gov'; 
// private apiKey = 'Nc2bNUaRqkbBLpzTxcEct08McovCqhIBnnvKoAoA'; 
// private API_URL = `${this.apiUrl}/planetary/apod?api_key=${this.apiKey}&count=10`;

   private API_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5';



     constructor(private http: HttpClient) {}
  
     getAPOD(): Observable<any[]>{
      console.log(this.API_URL);

       return this.http.get<any[]>(this.API_URL).pipe( catchError((error) => { 
         console.error('Error al obtener datos APOD:', error); 
        return throwError(error); 
      })
   );
      }
  
  }


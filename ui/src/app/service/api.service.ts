import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // RESPONSE PROFILES ROUTES

  // Create Response Profiles
  createResponseProfile(data: object): Observable<any> {
    let url = `${this.baseUri}/responseprofiles/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all Response Profiles
  getResponseProfiles() {
    return this.http.get(`${this.baseUri}/responseprofiles`);
  }

  // Get Response Profile
  getResponseProfile(id: string): Observable<any> {
    let url = `${this.baseUri}/responseprofiles/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Response Profile
  updateResponseProfile(id: string, data: object): Observable<any> {
    let url = `${this.baseUri}/responseprofiles/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  // Delete Response Profile
  deleteResponseProfile(id: string): Observable<any> {
    let url = `${this.baseUri}/responseprofiles/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }


  // RULES ROUTES

  // Create Rules
  createRules(data: object): Observable<any> {
    let url = `${this.baseUri}/rules/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all Rules
  getRules() {
    return this.http.get(`${this.baseUri}/rules`);
  }

  // Get Rule
  getRule(id: string): Observable<any> {
    let url = `${this.baseUri}/rules/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Rule
  updateRule(id: string, data: object): Observable<any> {
    let url = `${this.baseUri}/rules/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  // Delete Rule
  deleteRule(id: string): Observable<any> {
    let url = `${this.baseUri}/rules/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  // CONVERTERS ROUTES

  // Create Rules
  createConverters(data: object): Observable<any> {
    let url = `${this.baseUri}/converters/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all Rules
  getConverters() {
    return this.http.get(`${this.baseUri}/converters`);
  }

  // Get Rule
  getConverter(id: string): Observable<any> {
    let url = `${this.baseUri}/converters/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Rule
  updateConverter(id: string, data: object): Observable<any> {
    let url = `${this.baseUri}/converters/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  // Delete Rule
  deleteConverter(id: string): Observable<any> {
    let url = `${this.baseUri}/converters/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

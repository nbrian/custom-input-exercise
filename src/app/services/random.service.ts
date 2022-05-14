import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Payload } from '../model/payload.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  constructor(private http: HttpClient) {}

  fetchData(url: string) {
    return this.http
      .get<Payload>(url)
      .pipe(
        catchError((error) =>
          throwError(() => new Error(this.getServerErrorMessage(error)))
        )
      );
  }

  countWords(text: string) {
    const top = 10;
    const wordMap = text
      .toLowerCase()
      .split(' ') // convert to array and remove spaces
      .map((str: string) => {
        // remove dots at the end of string
        if (str.lastIndexOf('.') === str.length - 1) {
          return (str = str.substring(0, str.length - 1));
        }
        return str;
      })
      .reduce((prev: any, cur: string) => {
        let currentVal = prev.get(cur);
        if (currentVal) {
          prev.set(cur, ++currentVal);
        } else {
          prev.set(cur, 1);
        }
        return prev;
      }, new Map());
    const wordArray: { text: string; occurences: number }[] = Array.from(
      wordMap,
      ([text, occurences]) => ({ text, occurences })
    );
    const topWords = wordArray
      .sort((a, b) => (a.occurences > b.occurences ? -1 : 1))
      .splice(0, top);
    return topWords;
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}

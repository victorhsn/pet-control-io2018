import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private url: string = "http://localhost:5000/api/pet/v1/identify";

  constructor(private http: HttpClient) {

  }

  public postFile(fileToUpload: File) : Observable<any> {

    const data: FormData = new FormData();
    data.append('File', fileToUpload);

    return this.http.post<any>(this.url, data);

  }
}

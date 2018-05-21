import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private url: string = "http://localhost:5000/api/pet/v1/register";

  constructor(private http: HttpClient) {

  }

  public postFile(fileToUpload: File) {

    const data: FormData = new FormData();
    data.append('File', fileToUpload);

    return this.http.post(this.url, data);
  }
}

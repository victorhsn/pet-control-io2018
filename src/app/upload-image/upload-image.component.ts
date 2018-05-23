import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../shared/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {

  imageUrl : string = "/assets/img/default.png";
  fileToUpload : File = null;
  data: any = '';

  photoSelected = '';

  constructor(private imageService: UploadImageService) {

  }

  ngOnInit() {
    this.setPhotoSelected();
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
    this.sendFile(Image);
  }

  sendFile(Image) {
    this.imageService
    .postFile(this.fileToUpload)
    .subscribe(data => {
      this.data = data;
      Image.value = '';
      this.photoSelected = 'photo-selected';

      this.verifyDog(data.data[0].description);

    });
  }

  setPhotoSelected() {
    return this.photoSelected;
  }

  setPorcentValue(score) {
    return { 'width' : `${score}%`}
  }

  backToUpload() {
    this.photoSelected = '';
  }

  verifyDog(description) {
    if(description === 'pug') {
      document.querySelector(".its.a.pug").classList.remove("not");
    } else {
      document.querySelector(".its.a.pug").classList.add("not");
    }
  }
}

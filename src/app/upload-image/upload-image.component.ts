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
    this.setLoading(false);
  }

  handleFileInput(file: FileList) {

    this.setLoading(true);

    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);

    setTimeout(() => {
      this.sendFile(Image);
    }, 5000);

  }

  sendFile(Image) {
    this.imageService
    .postFile(this.fileToUpload)
    .subscribe(data => {

      this.data = data;
      Image.value = '';
      this.photoSelected = 'photo-selected';

      this.thereIsPug(data.data);

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

  thereIsPug(featuries) {

    for(let i = 0; i < featuries.length; i++ ) {

      if (featuries[i].description == 'pug') {
        document.querySelector(".its.a.pug").classList.remove("not");

      }
      this.setLoading(false);
    }
  }

  setLoading(value) {

    let load = document.getElementById('loading');

    if(value) {
      load.classList.add('loading');
    } else {
      load.classList.remove('loading');
    }
  }
}

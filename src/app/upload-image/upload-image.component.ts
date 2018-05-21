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

  constructor(private imageService: UploadImageService) {

  }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image) {
    this.imageService
        .postFile(this.fileToUpload)
        .subscribe(data => {
          this.data = data;
          Image.value = '';
          console.log(data);
        });
  }

  setStyles(score) {
    let style = {
      'width' : `${score}%`
    }

   return style
  }
}
import {Component, OnInit, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserAlbumsService} from "../services/user-albums.service";

@Component({
  selector: 'upload-photos',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})

export class UploadPhotoComponent implements OnInit {

  albums: any;
  temp_albums: any;

  temp_result: any;
  result: any;
  folder: any;
  temp_image: any;
  image: any;

  constructor(private http: HttpClient, private userAlbum: UserAlbumsService) {
  }

  @ViewChild("uploadImage") fileInput;
  @ViewChild("selectFolder") selectFolder;

  addFile() {
    let fi = this.fileInput.nativeElement;
    let sf = this.selectFolder.nativeElement;

    if (fi.files && sf.value) {
      let fileToUpload = fi.files[0];
      let folderToUpload = sf.value;
      console.log(folderToUpload);

      let input = new FormData();
      input.append("file", fileToUpload);
      input.append("folder", folderToUpload);

      this.http.get(`https://api.vk.com/method/photos.getUploadServer?album_id=${this.selectFolder.nativeElement.value}&v=5.52&access_token=${this.userAlbum.token}`)
        .subscribe((data) => {
          this.temp_result = data;
          this.result = this.temp_result.response;
          console.log(this.result.upload_url);

          this.http.post(this.result.upload_url, input)
            .subscribe(res => {
              this.temp_image = res;
              console.log(this.temp_image);
              this.http.get(`https://api.vk.com/method/photos.save?server=${this.temp_image.server}&photos_list=${this.temp_image.photos_list}&album_id=${this.selectFolder.nativeElement.value}&hash=${this.temp_image.hash}&v=5.52&access_token=${this.userAlbum.token}`)
                .subscribe((data) => {
                  this.image = data;

                  console.log(this.image.response[0].photo_604);
                  console.log(this.selectFolder.nativeElement.value);
                })
            });
        });
    }
  }

  ngOnInit() {
    this.http.get(`https://api.vk.com/method/photos.getAlbums?owner_id=93968091&v=5.52&access_token=${this.userAlbum.token}`)
      .subscribe((data) => {
        this.temp_albums = data;
        this.albums = this.temp_albums.response.items;
        console.log(this.albums);
      });
  }
}

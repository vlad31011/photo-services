import {Component, OnInit,} from '@angular/core';
import {UserAlbumsService} from "../services/user-albums.service"
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'user-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})

export class AlbumPhotosComponent implements OnInit {

  temp_albums: any;
  albums: any;
  temp_photos: any;
  photos: any;
  id: string;
  lazyImage: string = 'https://js.cx/lazyimg/1.gif';

  constructor(private userAlbum: UserAlbumsService, private http: HttpClient, private route: ActivatedRoute) {
    route.url
      .subscribe(() => {
        this.id = route.snapshot.params.id;
      });
    console.log(this.id);
  }

  ngOnInit() {
    this.userAlbum.getService()
      .subscribe((data) => {
        this.temp_albums = data;
        this.albums = this.temp_albums.response;
        this.http.get(`https://api.vk.com/method/photos.get?album_id=${this.id}&extended=1&need_covers=1&v=5.52&access_token=${this.userAlbum.token}`)
          .subscribe((result) => {
              this.temp_photos = result;
              this.photos = this.temp_photos.response.items;
              console.log(this.photos);
            }
          );
      });
  }
}

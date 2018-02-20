import {Component, OnInit} from '@angular/core';
import {UserAlbumsService} from "../services/user-albums.service"
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.css']
})

export class UserAlbumsComponent implements OnInit {

  albums: any = [];
  temp_albums: any;
  temp_user_info: any;
  user_info: string;
  term:any;

  constructor(private http: HttpClient, private userAlbum: UserAlbumsService) {}

  ngOnInit() {
    this.http.get(`https://api.vk.com/method/photos.getAlbums?need_covers=1&v=5.52&access_token=${this.userAlbum.token}`)
      .subscribe((data) => {

        this.temp_albums = data;
        this.albums = this.temp_albums.response.items;
        console.log(this.albums);
      });
    this.http.get(`https://api.vk.com/method/users.get?v=5.52&access_token=${this.userAlbum.token}`)
      .subscribe((result) => {
        this.temp_user_info = result;
        this.user_info = this.temp_user_info.response[0].first_name;
        console.log(this.user_info);
      })
  }
}


import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserAlbumsService} from "../services/user-albums.service"

@Component({
  selector: 'photo-information',
  templateUrl: './photo-information.component.html',
  styleUrls: ['./photo-information.component.css']
})

export class PhotoInformationComponent implements OnInit {
  owner_id: string;
  photo_id: string;
  temp_info: any;
  info: any;

  constructor(private http: HttpClient, route: ActivatedRoute, private userAlbum: UserAlbumsService) {
    route.url
      .subscribe(() => {
        this.owner_id = route.snapshot.params.oid;
        this.photo_id = route.snapshot.params.pid;
      });
  }

  ngOnInit() {
    this.http.get(`https://api.vk.com/method/photos.getById?photos=${this.owner_id}_${this.photo_id}&extended=1&photo_sizes=1&v=5.52&access_token=${this.userAlbum.token}`)
      .subscribe((result) => {
        this.temp_info = result;
        this.info = this.temp_info.response;
        console.log(this.info)
      });
  }
}

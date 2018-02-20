import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserAlbumsService} from "./services/user-albums.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private route: ActivatedRoute, public photoService: UserAlbumsService) {
  }

  getToken() {
    this.photoService.getCode();
  }
}


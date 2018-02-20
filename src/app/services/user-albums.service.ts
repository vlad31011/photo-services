import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Router} from '@angular/router';


@Injectable()

export class UserAlbumsService {

  // pageID: string = '93968091';
  // getToken: string = 'https://oauth.vk.com/authorize?client_id=6320917&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=photos,offline&response_type=token&v=5.52';
  // appID: string = '6320917';


  public token: string = '';
  public auth: string = 'https://oauth.vk.com/authorize?client_id=6320917&display=page&redirect_uri=https://vlad31011.github.io/photo-service/&scope=photos&response_type=code&v=5.71';

  private albumCovers: string = `https://api.vk.com/method/photos.getAlbums?need_covers=1&v=5.52&access_token=${this.token}`;
  album_id: number;

  private querySubscription: Subscription;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.getCode();
  }


  getService(): Observable<any> {
    return this.http.get(this.albumCovers);
  };

  getToken(code) {
    return this.http.get(`https://oauth.vk.com/access_token?client_id=6320917&client_secret=cbiUKiZpZFoJsbK1wsbE&redirect_uri=https://vlad31011.github.io/photo-service/&code=${code}`)
      .subscribe((data: any) => {
        this.token = data.access_token;
        this.router.navigate(['album']);
      });
  }

  getCode(): any {
    this.querySubscription = this.route.queryParams
      .subscribe(
        (queryParam: any) => {
          if (queryParam['code']) {
            this.getToken(queryParam['code']);
          }
        }
      )
  };
}

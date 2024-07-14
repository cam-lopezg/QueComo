import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
})
export class LugaresPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  openGoogleMaps() {
    const browser = this.iab.create('https://www.google.com/maps', '_system');
  }

  ngOnInit() {
  }

}




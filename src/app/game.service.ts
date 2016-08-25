import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  public activeImages = [];

  constructor(){
    this.reset();
  }

  getRandomBackground(){
    return this.activeImages.pop();
  }
  reset(){
    this.activeImages = [
      'url(https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAYSAAAAJGMxMGVjNDAxLTI3ODUtNDhiMy05YjAyLTA0NWYzMmFlNGJhZg.png)',
      'url(http://www.codeinfinitelabs.com/images/logos/angular_icon100_100_color.png)',
      'url(http://gregfranko.com/images/backbone.png)',
      'url(https://fiddle.sencha.com/resources/images/sencha-logo.png)',
      'url(https://atomate.net/hire-javascript-developers/united-kingdom/london/img/meteor.png)',
      'url(https://pbs.twimg.com/profile_images/1233502983/zepto-logo.png)'
    ]
  }
}

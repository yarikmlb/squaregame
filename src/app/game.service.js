"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var GameService = (function () {
    function GameService() {
        this.activeImages = [];
        this.reset();
    }
    GameService.prototype.getRandomBackground = function () {
        return this.activeImages.pop();
    };
    GameService.prototype.reset = function () {
        this.activeImages = [
            'url(https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAYSAAAAJGMxMGVjNDAxLTI3ODUtNDhiMy05YjAyLTA0NWYzMmFlNGJhZg.png)',
            'url(http://www.codeinfinitelabs.com/images/logos/angular_icon100_100_color.png)',
            'url(http://gregfranko.com/images/backbone.png)',
            'url(https://fiddle.sencha.com/resources/images/sencha-logo.png)',
            'url(https://atomate.net/hire-javascript-developers/united-kingdom/london/img/meteor.png)',
            'url(https://pbs.twimg.com/profile_images/1233502983/zepto-logo.png)'
        ];
    };
    GameService = __decorate([
        core_1.Injectable()
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map
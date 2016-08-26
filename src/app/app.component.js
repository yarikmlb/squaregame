"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var square_1 = require('./square');
var game_service_1 = require('./game.service');
var health_1 = require('./health');
var AppComponent = (function () {
    function AppComponent(_gameService) {
        this._gameService = _gameService;
        this.list = [];
        this.newVawe = [];
        this.health = [];
        this.healthCounter = 0;
        this.generateList(4);
    }
    AppComponent.prototype.generateList = function (count) {
        this.calc = count;
        for (var i = 0; i < count; i++) {
            var elemBackground = (i % 2 !== 0) ? this.list[i - 1].background : false;
            this.list.push(this.createItem(i, elemBackground));
        }
        this.health = [1, 2, 3];
        this.shuffle(this.list);
        this.isGameOver = false;
        this.isGameWin = false;
        this.showSquare(2000);
        alert('You have time to remember the location');
    };
    AppComponent.prototype.createItem = function (index, elemBackground) {
        return { background: elemBackground || this._gameService.getRandomBackground(), isOpen: true, id: index, statement: false };
    };
    AppComponent.prototype.destroy = function (square) {
        var _this = this;
        setTimeout(function () {
            //debugger;
            if (!_this.tmpItem && _this.health.length > 0) {
                _this.firstClick(square);
            }
            else if (_this.tmpItem.background !== square.background && _this.health.length > 0) {
                _this.setConditionWhenDifferentElements(square);
                //debugger;
                _this.removeHealth();
                if (_this.health.length === 0) {
                    /*if(confirm("You loose! Whant more?")){
                     this.playAgain();
                     }else {*/
                    _this.notPlayAgain();
                }
            }
            else if (_this.tmpItem === square && _this.health.length > 0) {
                _this.setConditionWhenSameElement();
            }
            else if (_this.check(square)) {
                _this.addNewHealth();
                _this.setConditionWhenColorSame(square);
                if (_this.newVawe.length === _this.calc && _this.calc < 12) {
                    _this.generateNewGame();
                }
                else if (_this.calc === 12 && _this.newVawe.length === 12 && _this.newVawe.every(_this.checkAllItems)) {
                    _this.isGameWin = true;
                    _this.list = [];
                }
                _this.tmpItem = null;
            }
        }, 1000);
    };
    AppComponent.prototype.shuffle = function (array) {
        var j, x, i;
        for (i = array.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = array[i - 1];
            array[i - 1] = array[j];
            array[j] = x;
        }
    };
    AppComponent.prototype.showSquare = function (time) {
        var _this = this;
        setTimeout(function () {
            for (var i = 0; i < _this.list.length; i++)
                _this.list[i].isOpen = false;
        }, time);
    };
    AppComponent.prototype.generateNewGame = function () {
        this.list = [];
        this.newVawe = [];
        this._gameService.reset();
        //this.health = [1, 2, 3];
        this.generateList(this.calc + 4);
        this.healthCounter = 0;
    };
    AppComponent.prototype.addNewHealth = function () {
        this.healthCounter += 1;
        if (this.healthCounter === 3) {
            this.health.push(this.healthCounter);
        }
    };
    /*playAgain(){
     this.list = [];
     this._gameService.reset();
     this.generateList(this.calc);
     this.health = [1, 2, 3];
     this.showSquare(2000);
     }*/
    AppComponent.prototype.notPlayAgain = function () {
        this.isGameOver = true;
        this.list = [];
    };
    AppComponent.prototype.setConditionWhenColorSame = function (elem) {
        this.tmpItem.isOpen = true;
        elem.isOpen = true;
        this.tmpItem.statement = true;
        elem.statement = true;
        this.newVawe.push(elem);
        this.newVawe.push(this.tmpItem);
    };
    AppComponent.prototype.setConditionWhenSameElement = function () {
        this.tmpItem.isOpen = false;
        this.tmpItem = null;
    };
    AppComponent.prototype.setConditionWhenDifferentElements = function (elem) {
        this.healthCounter = 0;
        this.tmpItem.isOpen = false;
        elem.isOpen = false;
        this.tmpItem = null;
    };
    AppComponent.prototype.firstClick = function (elem) {
        if (elem.statement === false) {
            this.tmpItem = elem;
        }
    };
    AppComponent.prototype.removeHealth = function () {
        this.health.pop();
    };
    AppComponent.prototype.check = function (square) {
        return (this.tmpItem.background === square.background && square.statement === false && this.tmpItem.statement === false && this.health.length > 0);
    };
    AppComponent.prototype.checkAllItems = function (element, array) {
        return element.isOpen === true;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [square_1.SquareComponent, health_1.HealthComponent],
            providers: [game_service_1.GameService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
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
    function AppComponent(_game) {
        this._game = _game;
        this.list = [];
        this.newVawe = [];
        this.health = [];
        this.generateList(4);
        this.health = [1, 2, 3];
        this.showSquare(1000);
        alert("You have one second to remember the location");
    }
    AppComponent.prototype.generateList = function (count) {
        this.calc = count;
        for (var i = 0; i < count; i++) {
            var elemColor = (i % 2 !== 0) ? this.list[i - 1].color : false;
            this.list.push(this.createItem(i, elemColor));
        }
        this.shuffle(this.list);
    };
    AppComponent.prototype.createItem = function (index, elemColor) {
        return { color: elemColor || this._game.getRandomBackground(), isOpen: true, id: index, statement: false };
    };
    AppComponent.prototype.destroy = function (square) {
        var _this = this;
        setTimeout(function () {
            //debugger;
            if (!_this.tmpItem && _this.health.length > 0) {
                if (square.statement === false) {
                    _this.tmpItem = square;
                }
            }
            else if (_this.tmpItem.color !== square.color && _this.health.length > 0) {
                _this.tmpItem.isOpen = false;
                square.isOpen = false;
                _this.tmpItem = null;
                _this.health.pop();
                if (_this.health.length === 0) {
                    if (confirm("You lose! Want more?")) {
                        _this.list = [];
                        _this._game.reset();
                        _this.generateList(_this.calc);
                        _this.health = [1, 2, 3];
                    }
                    else {
                        alert("See you...");
                        _this.list = [];
                    }
                }
            }
            else if (_this.tmpItem === square && _this.health.length > 0) {
                _this.tmpItem.isOpen = false;
                _this.tmpItem = null;
            }
            else if (_this.tmpItem.color === square.color && square.statement === false && _this.tmpItem.statement === false && _this.health.length > 0) {
                _this.tmpItem.isOpen = true;
                square.isOpen = true;
                _this.tmpItem.statement = true;
                square.statement = true;
                _this.newVawe.push(square);
                _this.newVawe.push(_this.tmpItem);
                if (_this.newVawe.length === _this.calc && _this.calc < 12) {
                    _this.list = [];
                    _this.newVawe = [];
                    _this._game.reset();
                    _this.health = [1, 2, 3];
                    _this.generateList(_this.calc + 4);
                    alert("You have three seconds to remember the location");
                    _this.showSquare(3000);
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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SquareComponent = (function () {
    function SquareComponent() {
        this.remove = new core_1.EventEmitter();
    }
    SquareComponent.prototype.openSquare = function () {
        if (this.square.statement === true) {
            return;
        }
        else {
            this.square.isOpen = !this.square.isOpen;
            this.remove.emit({ square: this.square });
        }
    };
    SquareComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], SquareComponent.prototype, "square");
    __decorate([
        core_1.Output()
    ], SquareComponent.prototype, "remove");
    SquareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'square',
            templateUrl: 'square.component.html',
            styleUrls: ['square.component.css']
        })
    ], SquareComponent);
    return SquareComponent;
}());
exports.SquareComponent = SquareComponent;
//# sourceMappingURL=square.component.js.map
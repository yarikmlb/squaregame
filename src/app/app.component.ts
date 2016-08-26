import { Component } from '@angular/core';
import {SquareComponent} from './square';
import {GameService} from './game.service';
import {HealthComponent} from './health';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [SquareComponent, HealthComponent],
  providers: [GameService]
})

export class AppComponent {
  public list = [];
  public newVawe = [];
  public calc: number;
  public tmpItem: any;
  public health = [];


  constructor (private _game: GameService) {
    this.generateList(4);
    this.health = [1, 2, 3];
    this.showSquare(1000);
    alert("You have one second to remember the location");
  }

  generateList(count){
    this.calc = count;
    for(let i = 0; i < count; i++){
      let elemColor = (i % 2 !== 0) ? this.list[i-1].color : false;
      this.list.push(this.createItem(i, elemColor));
    }
    this.shuffle(this.list);
  }

  createItem(index, elemColor){
    return {color: elemColor || this._game.getRandomBackground(), isOpen: true, id: index, statement: false};
  }

  destroy(square){
    setTimeout(() => {
      //debugger;
      if(!this.tmpItem && this.health.length > 0){
        if(square.statement === false){
          this.tmpItem = square;
        }
      }else if(this.tmpItem.color !== square.color && this.health.length > 0){
        this.tmpItem.isOpen = false;
        square.isOpen = false;
        this.tmpItem = null;
        this.health.pop();
        if(this.health.length === 0){
          if(confirm("You lose! Want more?")){
            this.list = [];
            this._game.reset();
            this.generateList(this.calc);
            this.health = [1, 2, 3];
          }else {
            alert("See you...");
            this.list = [];
          }
        }
      }else if(this.tmpItem === square && this.health.length > 0){
        this.tmpItem.isOpen = false;
        this.tmpItem = null;
      }else if(this.tmpItem.color === square.color && square.statement === false && this.tmpItem.statement === false && this.health.length > 0){
        this.tmpItem.isOpen = true;
        square.isOpen = true;
        this.tmpItem.statement = true;
        square.statement = true;
        this.newVawe.push(square);
        this.newVawe.push(this.tmpItem);
        if(this.newVawe.length === this.calc && this.calc < 12){
          this.list = [];
          this.newVawe = [];
          this._game.reset();
          this.health = [1, 2, 3];
          this.generateList(this.calc + 4);
          alert("You have three seconds to remember the location");
          this.showSquare(3000);
        }
        this.tmpItem = null;
      }
    }, 1000);
  }
  shuffle(array) {
    var j, x, i;
    for (i = array.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
    }
  }
  showSquare(time){
    setTimeout(()=>{
      for(let i = 0; i < this.list.length; i++)
        this.list[i].isOpen = false;
    },time);
  }
}

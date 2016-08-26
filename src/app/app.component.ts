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
  public healthCounter = 0;


  constructor (private _gameService: GameService) {
    this.generateList(4);
    this.health = [1, 2, 3];
    this.showSquare(1000);
    alert("You have one second to remember the location");
  }

  private generateList(count){
    this.calc = count;
    for(let i = 0; i < count; i++){
      let elemBackground = (i % 2 !== 0) ? this.list[i-1].background : false;
      this.list.push(this.createItem(i, elemBackground));
    }
    this.shuffle(this.list);
  }

  createItem(index, elemBackground){
    return {background: elemBackground || this._gameService.getRandomBackground(), isOpen: true, id: index, statement: false};
  }

  destroy(square){
    setTimeout(() => {
      //debugger;
      if(!this.tmpItem && this.health.length > 0){
        this.firstClick(square);

      }else if(this.tmpItem.background !== square.background && this.health.length > 0){
        this.setConditionWhenDifferentElements(square);
        //debugger;
        this.removeHealth();
        if(this.health.length === 0){
          if(confirm("You loose! Whant more?")){
            this.playAgain();
          }else {
            this.notPlayAgain();
          }
        }

      }else if(this.tmpItem === square && this.health.length > 0){
        this.setConditionWhenSameElement();

      }else if(this.checkColor(square)){
        this.addNewHealth();
        this.setConditionWhenColorSame(square);
        if(this.newVawe.length === this.calc && this.calc < 12){
          this.generateNewGame();
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

  generateNewGame(){
    this.list = [];
    this.newVawe = [];
    this._gameService.reset();
    //this.health = [1, 2, 3];
    this.generateList(this.calc + 4);
    this.healthCounter = 0;
    alert('У вас есть 3 секунды что бы запомнить расположение карт');
    this.showSquare(3000);
  }

  addNewHealth(){
    this.healthCounter += 1;
    if(this.healthCounter === 3){
      this.health.push(this.healthCounter);
    }
  }

  playAgain(){
    this.list = [];
    this._gameService.reset();
    this.generateList(this.calc);
    this.health = [1, 2, 3];
    this.showSquare(2000);
  }

  notPlayAgain(){
    alert("See you...");
    this.list = [];
  }

  setConditionWhenColorSame(elem){
    this.tmpItem.isOpen = true;
    elem.isOpen = true;
    this.tmpItem.statement = true;
    elem.statement = true;
    this.newVawe.push(elem);
    this.newVawe.push(this.tmpItem);
  }

  setConditionWhenSameElement(){
    this.tmpItem.isOpen = false;
    this.tmpItem = null;
  }

  setConditionWhenDifferentElements(elem){
    this.healthCounter = 0;
    this.tmpItem.isOpen = false;
    elem.isOpen = false;
    this.tmpItem = null;
  }

  firstClick(elem){
    if(elem.statement === false){
      this.tmpItem = elem;
    }
  }

  removeHealth(){
    this.health.pop();
  }

  checkColor(square){
    return (this.tmpItem.background === square.background && square.statement === false && this.tmpItem.statement === false && this.health.length > 0);
  }
}

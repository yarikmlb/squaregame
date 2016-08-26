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
  public isGameOver: any;
  public isGameWin: any;


  constructor(private _gameService: GameService) {
    this.generateList(4);

  }

  generateList(count){
    this.calc = count;
    for(let i = 0; i < count; i++){
      let elemBackground = (i % 2 !== 0) ? this.list[i-1].background : false;
      this.list.push(this.createItem(i, elemBackground));
    }
    this.health = [1, 2, 3];
    this.shuffle(this.list);
    this.isGameOver = false;
    this.isGameWin = false;
    this.showSquare(2000);
    alert('You have time to remember the location');
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
          /*if(confirm("You loose! Whant more?")){
           this.playAgain();
           }else {*/
          this.notPlayAgain();
          //}
        }

      }else if(this.tmpItem === square && this.health.length > 0){
        this.setConditionWhenSameElement();

      }else if(this.check(square)){
        this.addNewHealth();
        this.setConditionWhenColorSame(square);
        if(this.newVawe.length === this.calc && this.calc < 12){
          this.generateNewGame();
        }else if (this.calc === 12 && this.newVawe.length === 12 && this.newVawe.every(this.checkAllItems)){
          this.isGameWin = true;
          this.list = [];
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
  }

  addNewHealth(){
    this.healthCounter += 1;
    if(this.healthCounter === 3){
      this.health.push(this.healthCounter);
    }
  }

  /*playAgain(){
   this.list = [];
   this._gameService.reset();
   this.generateList(this.calc);
   this.health = [1, 2, 3];
   this.showSquare(2000);
   }*/

  notPlayAgain(){
    this.isGameOver = true;
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

  check(square){
    return (this.tmpItem.background === square.background && square.statement === false && this.tmpItem.statement === false && this.health.length > 0);
  }

  checkAllItems(element, array){
    return element.isOpen === true;
  }
}

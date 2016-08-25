import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'square',
  templateUrl: 'square.component.html',
  styleUrls: ['square.component.css']
})
export class SquareComponent implements OnInit {

  @Input()
  square: any;

  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }


  openSquare(){
    if(this.square.statement === true){
      return;
    } else {
      this.square.isOpen = !this.square.isOpen;
      this.remove.emit({square: this.square});
    }
  }

  ngOnInit() {
  }

}

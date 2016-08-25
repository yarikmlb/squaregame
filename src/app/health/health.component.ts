import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'health',
  templateUrl: 'health.component.html',
  styleUrls: ['health.component.css']
})
export class HealthComponent implements OnInit {

  @Input()
  heart: any;

  constructor() { }

  ngOnInit() {
  }

}

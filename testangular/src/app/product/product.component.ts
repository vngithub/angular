import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  labels = {title:'USB Sticks',
  add:'Add'};
  titleCount = 0;

  
  ngOnInit() {
  }
  addItem (){
  	this.titleCount++
  }

}

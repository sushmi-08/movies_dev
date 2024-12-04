import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }
  @Input() image_url: string = '';
  @Input() title: string = '';
  @Input() director: string = '';
  @Input() cast: string[] = [];
 @Input() description:string=''
 isExpanded: boolean = false;  
  ngOnInit(): void {
  }

  toogleCard(){
    this.isExpanded = !this.isExpanded;
  }
}

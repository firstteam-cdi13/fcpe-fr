import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent implements OnInit {
  @Input()
  aide : any;
  constructor() { }

  ngOnInit() {
  }

}

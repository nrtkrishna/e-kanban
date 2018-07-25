import { Component, OnInit, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.css']
})

export class UserstoryComponent implements OnInit {

  usNumber:string='';
  usDescription: string='';
  usOwner:string='';
  usPoints:string='';
  usColor : string ='';
  status : string = '';
  show : boolean = true;

  ngOnInit() {
  }

  @Input()
  public set usnumber(usNumber:string) {
    this.usNumber = usNumber;
  }
  @Input()
  public set usdescription(usDescription:string) {
    this.usDescription = usDescription;
  }
  @Input()
  public set usowner(usOwner:string) {
    this.usOwner = usOwner;
  }
  @Input()
  public set uspoints(usPoints:string) {
    this.usPoints = usPoints;
  }
  @Input()
  public set uscolor(usColor:string) {
    this.usColor = usColor;
  }
  @Input()
  public set usstatus(status:string) {
    this.status = status;
  }
public get usnumber(){
  return this.usNumber;
}
public get usdescription(){
  return this.usDescription;
}
public get usowner(){
  return this.usOwner;
}
public get uspoints(){
  return this.usPoints;
}
public get uscolor(){
  return this.usColor;
}
public get usstaus(){
  return this.usstatus;
}
}

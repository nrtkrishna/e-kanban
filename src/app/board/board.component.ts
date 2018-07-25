import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { UserstoryComponent } from '../userstory/userstory.component';
import { FirestoreService } from '../services/firestore.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  colorChoosen :string = "white";
  selectedOwner : string = "none";
  usno : string = '';
  userstoryList : Array<UserstoryComponent> =[];
  dipList : Array<UserstoryComponent> =[];
  qarList : Array<UserstoryComponent> =[];
  qipList : Array<UserstoryComponent> =[];
  qacList : Array<UserstoryComponent> =[];
  uatList : Array<UserstoryComponent> =[];
  prList : Array<UserstoryComponent> =[];
  deployedList : Array<UserstoryComponent> =[];
  usComponent : any = {};
  backlog : Array<any>;
  colors : Array<string> = [
    "Choose a color",
    "Eric fav color",
    "Gavin fav color",
    "Hari fav color",
    "Joyce fav color",
    "Kanaka fav color",
    "Krishna fav color",
    "Nagendran fav color",
    "Ramya fav color",
    "Riyaz fav color",
    "Wanda fav color",
    "pink",
    "orange"
  ];
  usersList : Array<string> = [
                                "Select Owner",
                                "Eric",
                                "Gavin",
                                "Hari",
                                "Joyce",
                                "Kanaka",
                                "Krishna",
                                "Nagendran",
                                "Ramya",
                                "Riyaz",
                                "Wanda"
                              ];

  edited : boolean = false;
  editstory : any;
  filterByName : string = "All";

  //filterWith = new EventEmitter();
 

  // @ViewChild('myModal') myModal;
  @ViewChild ('usNumber') usNumber;
  @ViewChild ('usDescription') usDescription;
  @ViewChild ('usOwner') usOwner;
  @ViewChild ('usPoints') usPoints;
 

  constructor(private firestoreService : FirestoreService) { }


  filterSelected(filterSelected){
    this.filterByName = filterSelected;
    console.log("Filter selected ============================>", this.filterByName);
   // this.filterWith.emit(this.filterByName);
   this.updateList("backlog");
   this.updateList("dip");
   this.updateList("qar");
   this.updateList("qip");
   this.updateList("qac");
   this.updateList("uat");
   this.updateList("pr");
   this.updateList("deployed");
  }

  updateList(listName){

    if(listName === "backlog"){
      for(let index in this.userstoryList){
        if(this.filterByName === 'undefined' || this.filterByName === "All"){
          this.userstoryList[index].show = true;
        }
        else if (this.userstoryList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.userstoryList[index].show = true;   
        }
        else{
          this.userstoryList[index].show = false;   
        }
      }
    }
    else if(listName === "dip"){
      for(let index in this.dipList){
        if(this.filterByName === 'undefined' || this.filterByName === "All"){
          this.dipList[index].show = true;
          console.log("undefined worked");
        }
        else 
        if (this.dipList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.dipList[index].show = true;   
        }
        else{
          this.dipList[index].show = false;   
        }
      }
    }
    else if(listName === "qar"){
      for(let index in this.qarList){
        if(this.filterByName === 'undefined' || this.filterByName === "All"){
          this.qarList[index].show = true;
        }
        else 
        if (this.qarList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.qarList[index].show = true;   
        }
        else{
          this.qarList[index].show = false;   
        }
      }
    }
    else if(listName === "qip"){
      for(let index in this.qipList){
        if(this.filterByName === 'undefined' || this.filterByName === "All"){
          this.qipList[index].show = true;
        }
        else 
        if (this.qipList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.qipList[index].show = true;   
        }
        else{
          this.qipList[index].show = false;   
        }
      }
    }
    else if(listName === "qac"){
      for(let index in this.qacList){
        if(this.filterByName === undefined || this.filterByName === "All"){
          this.qacList[index].show = true;
        }
        else 
        if (this.qacList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.qacList[index].show = true;   
        }
        else{
          this.qacList[index].show = false;   
        }
      }
    }
    else if(listName === "uat"){
      for(let index in this.uatList){
        if(this.filterByName === undefined || this.filterByName === "All"){
          this.uatList[index].show = true;
        }
        else 
        if (this.uatList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.uatList[index].show = true;   
        }
        else{
          this.uatList[index].show = false;   
        }
      }
    }
    else if(listName === "pr"){
      for(let index in this.prList){
        if(this.filterByName === undefined || this.filterByName === "All"){
          this.prList[index].show = true;
        }
        else 
        if (this.prList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.prList[index].show = true;   
        }
        else{
          this.prList[index].show = false;   
        }
      }
    }
    else if(listName === "deployed"){
      for(let index in this.deployedList){
        if(this.filterByName === undefined || this.filterByName === "All"){
          this.deployedList[index].show = true;
        }
        else 
        if (this.deployedList[index].usOwner.toLowerCase() === this.filterByName.toLowerCase()){  
          this.deployedList[index].show = true;   
        }
        else{
          this.deployedList[index].show = false;   
        }
      }
    }


  } //methid end

  ngOnInit() {

      this.firestoreService.getPost().subscribe(data => {
        console.log("backlog list ====> ", data as Array<any>);
        this.userstoryList = data as Array<any>;
      });

      this.firestoreService.getDIP().subscribe(data => {
        console.log("dev in progress list ====> ", data as Array<any>);
        this.dipList = data as Array<any>;
      });

      this.firestoreService.getQAR().subscribe(data => {
        console.log("qar list ====> ", data as Array<any>);
        this.qarList = data as Array<any>;
      });

      this.firestoreService.getQIP().subscribe(data => {
        console.log("qip list ====> ", data as Array<any>);
        this.qipList = data as Array<any>;
      });

      this.firestoreService.getQAC().subscribe(data => {
        console.log("qac list ====> ", data as Array<any>);
        this.qacList = data as Array<any>;
      });

      this.firestoreService.getUAT().subscribe(data => {
        console.log("uat list ====> ", data as Array<any>);
        this.uatList = data as Array<any>;
      });

      this.firestoreService.getPR().subscribe(data => {
        console.log("pr list ====> ", data as Array<any>);
        this.prList = data as Array<any>;
      });

      this.firestoreService.getDEPLOYED().subscribe(data => {
        console.log("deployed list ====> ", data as Array<any>);
        this.deployedList = data as Array<any>;
      });

  
  }

  openModal(usModal){

    console.log("User story modal open up =====> ",usModal);
    usModal.className = "modal fade show";
    document.getElementById("usModal").style.display = "block";

  }

  chooseOwner(ownerSelected, uNum){
    this.selectedOwner = ownerSelected;
    console.log("selected owner =====================> ", this.selectedOwner);
  }

  choosecolor(colorChoosen, usno){
    if(colorChoosen === 'Eric fav color'){
      this.colorChoosen = '#CC99CC';
    }
    else if(colorChoosen === 'Gavin fav color'){
      this.colorChoosen = '#736AFF';
    }
    else if(colorChoosen === 'Hari fav color'){
      this.colorChoosen = '#4646FF';
    }
    else if(colorChoosen === 'Joyce fav color'){
      this.colorChoosen = '#E16666';
    }
    else if(colorChoosen === 'Kanaka fav color'){
      this.colorChoosen = '#FF9966';
    }
    else if(colorChoosen === 'Krishna fav color'){
      this.colorChoosen = '#FFCC33';
    }
    else if(colorChoosen === 'Nagendran fav color'){
      this.colorChoosen = '#BCC6CC';
    }
    else if(colorChoosen === 'Ramya fav color'){
      this.colorChoosen = '#00FFFF';
    }
    else if(colorChoosen === 'Riyaz fav color'){
      this.colorChoosen = '#CCCCFF';
    }
    else if(colorChoosen === 'Wanda fav color'){
      this.colorChoosen = '#2B60DE';
    }
    else if(colorChoosen === 'pink'){
      this.colorChoosen = '#f441a0';
    }
    else if(colorChoosen === 'orange'){
      this.colorChoosen = '#e0810d';
    }

    //this.colorChoosen = colorChoosen;
    this.usno = usno;
    console.log("user story no =====> ", usno);
  }

  addStoryToBoard(event){

    this.usComponent.usNumber = this.usNumber.nativeElement.value;
    this.usComponent.usDescription = this.usDescription.nativeElement.value;
   // this.usComponent.usOwner = this.usOwner.nativeElement.value;
   this.usComponent.usOwner = this.selectedOwner;
    this.usComponent.usPoints = this.usPoints.nativeElement.value;
    this.usComponent.usColor = this.colorChoosen;
    if( this.usComponent.show === null){
      this.usComponent.show = true;
    }

    if(this.edited === true){
      let status = this.editstory.status;
      this.usComponent.status = status;
      
      this.firestoreService.updatePost(this.usComponent.status,this.usComponent.status,this.usComponent);
      //this.closeModel(document.getElementById("usModal"));
    }

    else{
      this.usComponent.status = "backlog";
      this.userstoryList.push(this.usComponent);  
      this.firestoreService.addPost(this.usComponent);
    }
      this.closeModel(document.getElementById("usModal"));
  }

  closeModel(modalBox) {
    // modalBox.className = "modal fade hide";
     document.getElementById("usModal").style.display = "none";
  }

  editUserStory(userstory){
    this.editstory = userstory;
    console.log("owner ===================> ",  (<HTMLInputElement>document.getElementById("usowner")).value);
    (<HTMLInputElement>document.getElementById("usno")).value = userstory.usNumber;
    (<HTMLInputElement>document.getElementById("usdesc")).value = userstory.usDescription;
    (<HTMLInputElement>document.getElementById("usowner")).value = userstory.usOwner;
    (<HTMLInputElement>document.getElementById("uspoints")).value = userstory.usPoints;
    this.openModal(document.getElementById("usModal"));
    this.edited = true;
  }

}

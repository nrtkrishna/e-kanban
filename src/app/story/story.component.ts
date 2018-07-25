import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserstoryComponent } from '../userstory/userstory.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

 // @Input()
 // storyList : Array<any>;

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
  filterBy : String = "";

  @Output()
  editUS  = new EventEmitter();

 uList : Array<any>;
 categories : Array<string> = [
  "Move to",
  "Backlog",
  "Development in progress",
  "QA Ready",
  "QA in progress",
  "QA completed",
  "BIZ/UAT Signoff",
  "Prod ready",
  "Deployed"
];

//filterFlag : Boolean = true;

 @Input()
  public set storyList(sList : Array<any>) {
    this.uList = sList;

    // for(let storyObj in this.uList){
    //   if(this.filterBy === '' || this.filterBy === undefined || this.filterBy === 'all'){
    //     this.uList[storyObj].show = true
    //   }
    //   else if(this.filterBy === this.uList[storyObj].usOwner){
    //     this.uList[storyObj].show = true

    //   }
       
       
    // }
  }

  @Input()
  public set filterName(filterString : String){
    this.filterBy = filterString;
    console.log("filterBy ===========> ", this.filterBy)
  }
  
  constructor(private firestoreService : FirestoreService) { }

  ngOnInit() {

  }

  moveUserstory(moveto, userstoryToMove, moveFrom){
    console.log("selected option =====> ", moveto, moveFrom, userstoryToMove);

   // pushing to arrays
   if(moveto==="Development in progress"){
     console.log("moving to DIP =====> ", userstoryToMove.status, moveFrom);
     userstoryToMove.status = "dip";
     this.dipList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"dip",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
   else if(moveto === "QA Ready"){
     userstoryToMove.status = "qar";
     this.qarList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"qar",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
     
   }
   else if(moveto === "Backlog"){
     userstoryToMove.status = "backlog";
     this.userstoryList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"backlog",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
   else if(moveto === "QA in progress"){
     userstoryToMove.status = "qip";
     this.qipList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"qip",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
   else if(moveto === "QA completed"){
     userstoryToMove.status = "qac";
     this.hideNotOwnedStories(this.qacList,userstoryToMove);
     this.qacList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"qac",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
     
   }
   else if(moveto === "BIZ/UAT Signoff"){
     userstoryToMove.status = "uat";
     this.uatList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"uat",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
   else if(moveto === "Prod ready"){
     userstoryToMove.status = "pr";
     this.prList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"pr",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
   else if(moveto === "Deployed"){
     userstoryToMove.status = "deployed";
     this.deployedList.push(userstoryToMove);
     this.firestoreService.updatePost(moveFrom,"deployed",userstoryToMove);
     this.deleteStory(userstoryToMove, moveFrom);
   }
 }

 hideNotOwnedStories(refreshList : Array<UserstoryComponent>, usToMove){
    for(let i in refreshList){
      if(refreshList[i].usNumber === usToMove.usNumber){
        refreshList[i].show = true;
      }
      else{
        refreshList[i].show = false;
      }
    }
 }

 deleteFromBoard(story){
  console.log("user story to delete from board =====> ", story.status, story.usNumber);
  this.deleteStory(story,story.status);
  this.firestoreService.deleteUS(story.status, story.usNumber);
  
 }

 editStory(story){
   console.log("emitting ================> ", story);
    this.editUS.emit(story);
 }

 deleteStory(userstoryToMove,moveFrom) { 
    
  var data;
  if(moveFrom === "backlog"){
    console.log("deleting......", userstoryToMove, this.userstoryList);
    data = this.userstoryList;
  }
  else if(moveFrom === "dip"){
    data = this.dipList;
  }
  else if(moveFrom === "qar"){
   data = this.qarList;
  }
  else if(moveFrom === "qip"){
    data = this.qipList;
  }
  else if(moveFrom === "qac"){
   data = this.qacList;
  }
  else if(moveFrom === "uat"){
    data = this.uatList;
  }
  else if(moveFrom === "pr"){
    data = this.prList;
  }
  else if(moveFrom === "deployed"){
    data = this.deployedList;
  }

  const index: number = data.indexOf(userstoryToMove);
  if (index !== -1) {
      data.splice(index, 1);
  }   
}

}

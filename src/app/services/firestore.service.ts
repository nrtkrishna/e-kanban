import { Injectable } from '@angular/core';

//Firebase related imports
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

interface Userstory {
  usnumber: string;
  usdescription: string;
  usowner : string;
  uspoints : string;
  uscolor : string;
}


@Injectable()
export class FirestoreService {

  usnumber: string;
  usdescription: string;
  usowner : string;
  uspoints : string;
  uscolor : string;
  
  backlogstoriesCol: AngularFirestoreCollection<Userstory>;
  backlogstories : Observable<Userstory[]>;
  dipstoriesCol:AngularFirestoreCollection<Userstory>;
  dipstories : Observable<Userstory[]>;
  qarstoriesCol:AngularFirestoreCollection<Userstory>;
  qarstories : Observable<Userstory[]>;
  qacstoriesCol:AngularFirestoreCollection<Userstory>;
  qacstories : Observable<Userstory[]>;
  qipstoriesCol:AngularFirestoreCollection<Userstory>;
  qipstories : Observable<Userstory[]>;
  uatstoriesCol:AngularFirestoreCollection<Userstory>;
  uatstories : Observable<Userstory[]>;
  prstoriesCol:AngularFirestoreCollection<Userstory>;
  prstories : Observable<Userstory[]>;
  deployedstoriesCol:AngularFirestoreCollection<Userstory>;
  deployedstories : Observable<Userstory[]>;

  doc : AngularFirestoreDocument<Userstory>;

  // userstoryDoc: AngularFirestoreDocument<Userstory>;
  // userstory: Observable<Userstory>;
  // userstoryList: Array<Userstory>;

  constructor(private afs: AngularFirestore) {
    
  }

  ngOnInit() {
   
  }

  addPost(uscomp) {
    // this.afs.collection('backlogstories').doc('9WUoVDjfPcf3K4W9rOUP').set({'usNumber': usNumber, 'usDescription': usDescription, 'usOwner':usOwner,
    //                     'usPoints': usPoints, 'usColor':usColor});
    this.afs.collection('backlog').doc(uscomp.usNumber).set({'usNumber': uscomp.usNumber, 'usDescription': uscomp.usDescription, 'usOwner':uscomp.usOwner,'usPoints': uscomp.usPoints, 'usColor':uscomp.usColor, 'status':uscomp.status, 'show':true});
    
    //this.afs.collection('backlogstories').doc(uscomp.usNumber).set(uscomp as Userstory);
  
  }

  getPost(): Observable<Userstory[]>{

    this.backlogstoriesCol = this.afs.collection('backlog');
    this.backlogstories = this.backlogstoriesCol.valueChanges();
    console.log("service called =====> ",this.backlogstories);
    return this.backlogstories;
  }
  getDIP():Observable<Userstory[]>{
    this.dipstoriesCol = this.afs.collection('dip');
    this.dipstories = this.dipstoriesCol.valueChanges();
    return this.dipstories;
  }
  getQAR():Observable<Userstory[]>{
    this.qarstoriesCol = this.afs.collection('qar');
    this.qarstories = this.qarstoriesCol.valueChanges();
    return this.qarstories;
  }
  getQIP():Observable<Userstory[]>{
    this.qipstoriesCol = this.afs.collection('qip');
    this.qipstories = this.qipstoriesCol.valueChanges();
    return this.qipstories;
  }
  getQAC():Observable<Userstory[]>{
    this.qacstoriesCol = this.afs.collection('qac');
    this.qacstories = this.qacstoriesCol.valueChanges();
    return this.qacstories;
  }
  getUAT():Observable<Userstory[]>{
    this.uatstoriesCol = this.afs.collection('uat');
    this.uatstories = this.uatstoriesCol.valueChanges();
    return this.uatstories;
  }
  getPR():Observable<Userstory[]>{
    this.prstoriesCol = this.afs.collection('pr');
    this.prstories = this.prstoriesCol.valueChanges();
    return this.prstories;
  }
  getDEPLOYED():Observable<Userstory[]>{
    this.deployedstoriesCol = this.afs.collection('deployed');
    this.deployedstories = this.deployedstoriesCol.valueChanges();
    return this.deployedstories;
  }

  updatePost(moveFrom,moveTo,usToMove){
    console.log("move from and move to =====>", moveFrom,moveTo);
      const x = this.afs.collection(moveTo).doc(usToMove.usNumber);
      x.ref.get().then(doc => {
        if (!doc.exists) {
          x.set(usToMove);
        } else {
          x.update(usToMove);
        }
      });

    this.deleteUS(moveFrom,usToMove.usNumber);
    
  }

  deleteUS(mf,usn){
    this.afs.doc(mf+'/'+usn).delete();
  }

}

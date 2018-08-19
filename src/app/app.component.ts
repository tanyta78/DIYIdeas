import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'diy-ideas-web';
  loadedFeature='project';

  ngOnInit(){
    let config = {
      apiKey: "AIzaSyCQ41lfirywP5vqeO36SNQerIFhxiShTrw",
    authDomain: "diy-ideas-e2852.firebaseapp.com",
    databaseURL: "https://diy-ideas-e2852.firebaseio.com",
    projectId: "diy-ideas-e2852",
    storageBucket: "diy-ideas-e2852.appspot.com",
    messagingSenderId: "822828624861"

    };
    firebase.initializeApp(config);

    // var serviceAccount = require("./diy-ideas-e2852-firebase-adminsdk-97tkr-fa2ce549e6.json");

    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: "https://diy-ideas-e2852.firebaseio.com"
    // });

  }

  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}

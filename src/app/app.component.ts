import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  loadedFeature='recipe';

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
    
  }
  
  onNavigate(feature:string){
    this.loadedFeature=feature;
  }

}

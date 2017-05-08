import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RedditServices}  from '../../app/services/reddit.services';
import {DetailsPage} from '../details/details'
@Component({
  selector: 'reddit',
  templateUrl: 'reddit.html'
})
export class RedditPage {
  items: any;
  category: any;
  limit: any;
  constructor(public navCtrl: NavController, private redditService:RedditServices) {
  this.getDefaults();
  }
  ngOnInit() {
    this.getPosts(this.category, this.limit);
  }

  getDefaults(){
    if(localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    } else {
      this.category = 'sports';
    }

    if(localStorage.getItem('limit') != null){
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }
   getPosts(category,limit){
    this.redditService.getPosts(category,limit).subscribe(response =>{console.log(response);
      this.items = response.data.children;
    });

   }
   viewItem(item) {
     this.navCtrl.push(DetailsPage, {
       item: item
     })
   }
   changeCategory(){
   this.getPosts(this.category, this.limit);
   }
}

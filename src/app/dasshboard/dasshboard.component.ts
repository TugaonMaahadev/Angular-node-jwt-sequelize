import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dasshboard',
  templateUrl: './dasshboard.component.html',
  styleUrls: ['./dasshboard.component.scss']
})
export class DasshboardComponent implements OnInit {
  userData: any;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.api.getUserWithImages().subscribe((data: any) => {
      console.log(data.data, 'data')
      this.userData = data.data;
    })
  }
  deleteImages(user_id) {
    let userId = {
      userId: user_id
    }
    this.api.deleteUserImages(userId).subscribe((data) => {
      console.log(data, 'images deleted')
      this.ngOnInit()
    })
  }

}

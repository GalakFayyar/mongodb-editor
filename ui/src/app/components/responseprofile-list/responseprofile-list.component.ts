import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-responseprofile-list',
  templateUrl: './responseprofile-list.component.html',
  styleUrls: ['./responseprofile-list.component.scss']
})
export class ResponseProfileListComponent implements OnInit {
  ResponseProfiles: any = [];

  constructor(private apiService: ApiService) {
    this.readResponseProfiles();
  }

  ngOnInit() {
    this.ResponseProfiles = [];
  }

  readResponseProfiles() {
    this.apiService.getResponseProfiles().subscribe(data => {
      this.ResponseProfiles = data;
    });
  }

  removeResponseProfile(responseProfile: any, index: number) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteResponseProfile(responseProfile._id).subscribe(data => {
        this.ResponseProfiles.splice(index, 1);
      });
    }
  }
}

import { ResponseProfile } from './../../model/response-profile';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-responseprofile-edit',
  templateUrl: './responseprofile-edit.component.html',
  styleUrls: ['./responseprofile-edit.component.scss']
})
export class ResponseProfileEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  responseProfileData: ResponseProfile[];
  responseProfileType: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateResponseProfile();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getResponseProfile(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  // Choose options with select-dropdown
  updateType(e: any) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getResponseProfile(id: string) {
    this.apiService.getResponseProfile(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        designation: data['designation'],
        phoneNumber: data['phoneNumber']
      });
    });
  }

  updateResponseProfile() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateResponseProfile(id, this.editForm.value).subscribe(
          res => {
            this.router.navigateByUrl('/responseprofile-list');
            console.log('Content updated successfully!');
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}

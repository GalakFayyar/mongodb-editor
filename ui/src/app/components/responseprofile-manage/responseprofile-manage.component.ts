import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseProfile } from '@app/model/response-profile';

@Component({
  selector: 'app-responseprofile-manage',
  templateUrl: './responseprofile-manage.component.html',
  styleUrls: ['./responseprofile-manage.component.scss']
})
export class ResponseProfileManageComponent implements OnInit {
  submitted = false;
  responseProfileForm: FormGroup;
  Brands: any = ['Mastercard', 'VISA', 'mada', 'UPI', 'GCCNET', 'AMEX'];
  deFields: any = [];
  responseProfiles: any[];
  availableMatchingCriteria: any[];
  availableSpecific: any[];
  cols: any[];

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
    this.mainForm();
  }

  ngOnInit() {
    this.responseProfiles = [
      { name: 'Response Profile Test 001', _id: '12345', matchingCriteria: [], responseType: 'REFERENCE', specific: [] },
      { name: 'Response Profile Test 002', _id: '67890', matchingCriteria: [], responseType: 'REFERENCE', specific: [] },
    ];

    this.availableMatchingCriteria = ['IN->MTI=^1100$', 'IN->MTI=^1200$'];

    this.availableSpecific = [
      'MADA_PIN_VALIDATION',
      'MADA_ARQC_VALIDATION',
      'MADA_ARPC_GENERATION',
      'MC_PIN_VALIDATION',
      'MC_ARQC_VALIDATION',
      'MC_ARPC_GENERATION',
      'GCCNET_PIN_VALIDATION',
      'GCCNET_ARQC_VALIDATION',
      'GCCNET_ARPC_GENERATION'
    ];

    this.cols = ['name', '_id', 'matchingCriteria', 'responseType', 'specific'];

    for (let i = 1; i <= 128; i++) {
      this.deFields.push('DE' + i.toString().padStart(3, '0'));
    }
  }

  mainForm() {
    this.responseProfileForm = this.fb.group({
      brand: ['', [Validators.required]],
      version: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  // Choose designation with select dropdown
  updateBrand(e: any) {
    this.responseProfileForm.get('brand').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.responseProfileForm.controls;
  }

  // onSubmit() {
  //   this.submitted = true;
  //   if (!this.responseProfileForm.valid) {
  //     return false;
  //   } else {
  //     this.apiService.createResponseProfile(this.responseProfileForm.value).subscribe(
  //       (res: object) => {
  //         console.log('Response Profiles successfully created!');
  //         this.ngZone.run(() => this.router.navigateByUrl('/responseprofile-list'));
  //       },
  //       (error: object) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }

  submit() {
    const rps: ResponseProfile[] = [];

    this.responseProfiles.forEach(responseProfile => {
      const rp: ResponseProfile = {
        _id: responseProfile._id,
        name: responseProfile.name,
        matchingCriteria: responseProfile.matchingCriteria,
        responseType: responseProfile.responseType,
        specific: responseProfile.specific
      };
      rps.push(rp);
    });

    console.log(rps);

    this.apiService.createResponseProfile(rps).subscribe(
      (res: object) => {
        console.log('Response Profiles successfully created!');
        this.ngZone.run(() => this.router.navigateByUrl('/manage-responseprofile'));
      },
      (error: object) => {
        console.log(error);
      }
    );
  }
}

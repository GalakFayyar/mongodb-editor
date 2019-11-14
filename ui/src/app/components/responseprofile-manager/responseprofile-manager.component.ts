import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseProfile } from '@app/model/response-profile';

@Component({
  selector: 'app-responseprofile-manager',
  templateUrl: './responseprofile-manager.component.html',
  styleUrls: ['./responseprofile-manager.component.scss']
})
export class ResponseProfileManagerComponent implements OnInit {
  submitted = false;
  responseProfileForm: FormGroup;
  Brands: any = ['Mastercard', 'VISA', 'mada', 'UPI', 'GCCNET', 'AMEX'];
  deFields: any = [];
  responseProfiles: any[] = [];
  availableMatchingCriteria: any[];
  availableSpecific: any[];
  cols: any[];

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
    this.mainForm();
  }

  ngOnInit() {
    this.apiService.getResponseProfiles().subscribe(
      (res: any[]) => {
        console.log(res);
        this.responseProfiles = res;
      },
      (error: object) => {
        console.log(error);
      }
    );

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

    this.cols = ['_id', 'name', 'matchingCriteria', 'responseType', 'specific'];

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

    this.apiService.createResponseProfile(rps).subscribe(
      (res: object) => {
        console.log('Response Profiles successfully created!');
        this.ngZone.run(() => this.router.navigateByUrl('/responseprofiles-manager'));
      },
      (error: object) => {
        console.log(error);
      }
    );
  }
}

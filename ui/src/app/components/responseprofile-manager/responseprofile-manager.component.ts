import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseProfile } from '@app/model/response-profile';

@Component({
  selector: 'app-responseprofile-manager',
  templateUrl: './responseprofile-manager.component.html',
  styleUrls: ['./responseprofile-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResponseProfileManagerComponent implements OnInit {
  submitted = false;
  responseProfileForm: FormGroup;
  Brands: any = ['Mastercard', 'VISA', 'mada', 'UPI', 'GCCNET', 'AMEX'];
  deFields: any = [];
  responseProfiles: any[] = [];
  scrollableColumns: any[] = [
    { field: 'responseType', header: 'Response Type', width: '150px', type: 'text' },
  ];
  frozenColumns: any[] = [
    { field: 'name', width: '300px', header: 'Name', type: 'text' },
    { field: 'matchingCriteria', header: 'Matching Criteria', width: '250px', type: 'multi' },
    { field: 'specific', header: 'Specific', width: '250px', type: 'multi' },
  ];

  itemList: any = {
    machingCriteria: ['IN->MTI=^1100$', 'IN->MTI=^1200$'],
    specific: [
      'MADA_PIN_VALIDATION',
      'MADA_ARQC_VALIDATION',
      'MADA_ARPC_GENERATION',
      'MC_PIN_VALIDATION',
      'MC_ARQC_VALIDATION',
      'MC_ARPC_GENERATION',
      'GCCNET_PIN_VALIDATION',
      'GCCNET_ARQC_VALIDATION',
      'GCCNET_ARPC_GENERATION'
    ]
  }

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

    for (let i = 2; i <= 127; i++) {
      this.scrollableColumns.push({
        field: 'DE' + i.toString().padStart(3, '0'),
        header: 'DE' + i.toString().padStart(3, '0'),
        type: 'text',
        width: '150px'
      });
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

import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseProfile } from '@app/model/response-profile';

@Component({
  selector: 'app-responseprofile-manager',
  templateUrl: './responseprofile-manager.component.html',
  styleUrls: ['./responseprofile-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResponseProfileManagerComponent implements OnInit {

  // Getter to access form control
  get myForm() {
    return this.responseProfileForm.controls;
  }
  submitted = false;
  loading: boolean;
  responseProfileForm: FormGroup;
  deFields: any = [];
  filteredValuesLength: number;
  rules: any[];
  responseProfiles: any[] = [];
  scrollableColumns: any[] = [
    { field: 'Specific', dataSrc: 'rules', header: 'Specific', width: '250px', type: 'multi' },
    { field: 'ResponseType', dataSrc: 'responseTypes', header: 'Type', width: '150px', type: 'select' },
    { field: 'TestPlan', dataSrc: 'testPlans', header: 'Test Plan', width: '250px', type: 'select' },
    { field: 'Card', header: 'Card', width: '250px', type: 'text' },
  ];
  frozenColumns: any[] = [
    { field: 'Name', sortable: false, searchable: true, width: '300px', header: 'Name', type: 'text' },
    { field: 'Protocol', sortable: false, dataSrc: 'protocols', width: '150px', header: 'Protocol', type: 'select' },
    { field: 'MatchingCriteria', dataSrc: 'matchingCriteria', header: 'Matching Criteria', width: '250px', type: 'multi' },
  ];

  itemList: any = {
    machingCriteria: ['IN->MTI=^1100$', 'IN->MTI=^1200$'],
    types: ['REFERENCE', 'CUSTOM', 'DEFAULT', 'POSTPROCESSOR'],
    rules: [],
    responseTypes: ['REFERENCE', 'DEFAULT', 'TEMPLATE', 'POSTPROCESSOR',],
    protocols: ['MASTERCARD', 'VISA', 'MBI', 'EFTPOS', 'UPI', 'GCCNET', 'AMEX'],
    brands: ['MASTERCARD', 'VISA', 'MADA', 'UPI', 'GCCNET', 'AMEX'],
    fieldOperation: [],
    testPlans: []
  }

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
    this.mainForm();
  }

  ngOnInit() {
    this.loading = true;

    this.apiService.getRules().subscribe(
      (res: any[]) => {
        this.rules = res;

        this.itemList.rules =  this.rules.map(rule => rule.Name);

        this.itemList.fieldOperation =  this.rules.map(rule => {
          return { label: rule.Name, value: rule.Name }
        });
        this.itemList.fieldOperation.push({ label: 'Copy', value: 'COPY' });
      },
      (error: object) => {
        console.log(error);
      }
    );

    this.apiService.getResponseProfiles().subscribe(
      (res: any[]) => {
        console.log('Response Profiles:', res);

        const listTestPlans = res.map(responseProfile => responseProfile.TestPlan);

        this.itemList.testPlans = [...new Set(listTestPlans)];
        this.itemList.testPlans = this.itemList.testPlans.filter((elt: any) => elt !== undefined);
        console.log('this.itemList.testPlans: ', this.itemList.testPlans);
        this.responseProfiles = res;

        this.filteredValuesLength = this.responseProfiles.length;

        this.loading = false;
      },
      (error: object) => {
        console.log(error);
      }
    );

    for (let i = 2; i <= 127; i++) {
      this.scrollableColumns.push({
        field: 'DE' + i.toString().padStart(3, '0'),
        header: 'DE' + i.toString().padStart(3, '0'),
        type: 'select',
        dataSrc: 'fieldOperation',
        width: '215px'
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

  filterOptions(field: string) {
    const arrayOfFilter: any[] = [];

    if (this.responseProfiles != null) {
      const listElements = this.responseProfiles.map(responseProfile => responseProfile[field]);
      let distinctElements = [...new Set(listElements)];
      distinctElements = distinctElements.filter(elt => elt !== undefined);

      distinctElements.forEach(element => {
        arrayOfFilter.push({
          label: element,
          value: element
        });
      });
    }

    return arrayOfFilter;
  }

  onFilter(event: any, dt: any) {
    this.filteredValuesLength = event.filteredValue.length; // count of displayed rows
  }

  submit() {
    const rps: ResponseProfile[] = [];

    this.responseProfiles.forEach(responseProfile => {
      const rp: ResponseProfile = {
        _id: responseProfile._id,
        Name: responseProfile.Name,
        MatchingCriteria: responseProfile.MatchingCriteria,
        ResponseType: responseProfile.ResponseType,
        Specific: responseProfile.Specific
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

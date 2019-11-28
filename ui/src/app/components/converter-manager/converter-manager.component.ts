import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Converter } from '@app/model/converter';

@Component({
  selector: 'app-converter-manager',
  templateUrl: './converter-manager.component.html',
  styleUrls: ['./converter-manager.component.scss']
})
export class ConverterManagerComponent implements OnInit {

  submitted = false;
  loading: boolean;
  deFields: any = [];
  filteredValuesLength: number;
  rules: any[];
  converters: any[] = [];
  scrollableColumns: any[] = [
    { field: 'Specific', dataSrc: 'rules', header: 'Specific', width: '250px', type: 'multi' },
    { field: 'MTI', header: 'MTI', width: '250px', type: 'text' },
  ];
  frozenColumns: any[] = [
    { field: 'Name', sortable: false, searchable: true, width: '150px', header: 'Name', type: 'text' },
    { field: 'Source', sortable: false, dataSrc: 'protocols', width: '150px', header: 'Source', type: 'select' },
    { field: 'Dest', sortable: false, dataSrc: 'protocols', width: '150px', header: 'Dest', type: 'select' },
    { field: 'MatchingCriteria', dataSrc: 'matchingCriteria', header: 'Matching Criteria', width: '250px', type: 'multi' },
  ];

  itemList: any = {
    machingCriteria: ['IN->MTI=^1100$', 'IN->MTI=^1200$'],
    types: ['REFERENCE', 'CUSTOM', 'DEFAULT', 'POSTPROCESSOR'],
    rules: [],
    protocols: ['MASTERCARD', 'VISA', 'MBI', 'EFTPOS', 'UPI', 'GCCNET', 'AMEX'],
    brands: ['MASTERCARD', 'VISA', 'MADA', 'UPI', 'GCCNET', 'AMEX'],
    fieldOperation: []
  }

  constructor(private router: Router, private ngZone: NgZone, private apiService: ApiService) { }

  ngOnInit() {
    this.loading = true;

    this.apiService.getRules().subscribe(
      (res: any[]) => {
        console.log(res);
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

    this.apiService.getConverters().subscribe(
      (res: any[]) => {
        console.log('Converters:', res);
        this.converters = res.map(conv => {
          for(const key in conv.Fields){
            conv[key] = conv.Fields[key];
          }
          return conv;
        });
        console.log(this.converters);
        this.filteredValuesLength = this.converters.length;
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
        type: 'multi',
        dataSrc: 'fieldOperation',
        width: '215px'
      });
    }
  }

  filterOptions(field: string) {
    const arrayOfFilter: any[] = [];

    if (this.converters != null) {
      const listElements = this.converters.map(converter => converter[field]);
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
    const _converters: Converter[] = [];

    this.converters.forEach(converter => {
      const _converter: Converter = {
        _id: converter._id,
        Source: converter.Source,
        Dest: converter.Dest,
        Name: converter.Name,
        MatchingCriteria: converter.MatchingCriteria,
        Specific: converter.Specific
      };
      _converters.push(_converter);
    });

    this.apiService.createConverters(_converters).subscribe(
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

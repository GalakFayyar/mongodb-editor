import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Rule } from '@app/model/rule';

@Component({
  selector: 'app-rule-manager',
  templateUrl: './rule-manager.component.html',
  styleUrls: ['./rule-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RuleManagerComponent implements OnInit {
  submitted = false;
  cols: any[] = [
    // { field: '_id', header: 'Id' },
    { field: 'name', header: 'Name', type: 'text', filterable: true },
    { field: 'description', header: 'Description', type: 'text' },
    { field: 'type', header: 'Type', type: 'select', filterable: true },
    { field: 'source', header: 'Source', type: 'text', filterable: true },
    { field: 'dest', header: 'Destination', type: 'text', filterable: true },
    // { field: 'format', header: 'Format', type: 'text' },
    { field: 'copyMode', header: 'CopyMode', type: 'select', filterable: true },
    { field: 'customProcessor', header: 'CustomProcessor', width: '300px', type: 'multi' },
    { field: 'params', header: 'Params', type: 'text' },
    { field: 'ifOkRule', header: 'IfOkRule', type: 'text' },
    { field: 'ifNotOkRule', header: 'IfNotOkRule', type: 'text' }
  ];
  rules: any[];
  itemList: any = {
    customProcessor: []
  };
  optionList: any = {
    type: [
      { label: 'Custom', value:'Custom' },
      { label: 'Copy', value: 'Copy'},
      { label: 'Regex Compare', value: 'Regex_Compare'},
      { label: 'Check Presence', value: 'Check_Presence'},
    ],
    copyMode: [
      { label: 'Append', value:'APPEND' },
      { label: 'Create Or Replace', value: 'CREATE_OR_REPLACE'}
    ]
  };

  constructor(private router: Router, private ngZone: NgZone, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getRules().subscribe(
      (res: any[]) => {
        this.rules = res;
        console.log(res);
      },
      (error: object) => {
        console.log(error);
      }
    );
  }

  filterOptions(field: string) {
    let arrayOfFilter: any[] = [];

    if (this.rules != null) {
      const listElements = this.rules.map(rule => rule[field]);
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

  submit() {
    const rules: Rule[] = [];

    this.rules.forEach(rule => {
      const _rule: Rule = {
        _id: rule._id,
        name: rule.name,
        description: rule.description,
        type: rule.type,
        source: rule.source,
        dest: rule.dest,
        format: rule.format,
        copyMode: rule.copyMode,
        customProcessor: rule.customProcessor,
        params: rule.params,
        ifOkRules: rule.ifOkRules,
        ifNotOkRules: rule.ifNotOkRules
      };
      rules.push(_rule);
    });

    console.log(this.rules);

    this.apiService.createRules(rules).subscribe(
      (res: object) => {
        console.log('Rules successfully created!');
        this.ngZone.run(() => this.router.navigateByUrl('/rules-manager'));
      },
      (error: object) => {
        console.log(error);
      }
    );
  }
}

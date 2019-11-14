import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rule } from '@app/model/rule';

@Component({
  selector: 'app-rule-manager',
  templateUrl: './rule-manager.component.html',
  styleUrls: ['./rule-manager.component.scss']
})
export class RuleManagerComponent implements OnInit {
  submitted = false;
  cols: any[] = [
    { field: '_id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'type', header: 'Type' },
    { field: 'source', header: 'Source' },
    { field: 'dest', header: 'Destination' },
    { field: 'format', header: 'Format' },
    { field: 'copyMode', header: 'CopyMode' },
    { field: 'customProcessor', header: 'CustomProcessor' },
    { field: 'params', header: 'Params' },
    { field: 'ifOkRule', header: 'IfOkRule' },
    { field: 'ifNotOkRule', header: 'IfNotOkRule' }
  ];
  rules: any[];

  availableCopyModes: any[] = [
    { label: 'Append', value:'APPEND' },
    { label: 'Create Or Replace', value: 'CREATE_OR_REPLACE'}
  ];
  availableUpdateModes: string[] = ['APPEND', 'CREATE_OR_REPLACE'];
  availableCustomProcessors: any[];

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getResponseProfiles().subscribe(
      (res: any[]) => {
        console.log(res);
      },
      (error: object) => {
        console.log(error);
      }
    );

    // this.cols = [
    //   { field: 'name', header: 'Name' },
    //   { field: 'description', header: 'Description' },
    //   { field: 'type', header: 'Type' },
    //   { field: 'source', header: 'Source' },
    //   { field: 'dest', header: 'Destination' },
    //   { field: 'format', header: 'Format' },
    //   { field: 'copyMode', header: 'CopyMode' },
    //   { field: 'customProcessor', header: 'CustomProcessor' },
    //   { field: 'params', header: 'Params' },
    //   { field: 'ifOkRule', header: 'IfOkRule' },
    //   { field: 'ifNotOkRule', header: 'IfNotOkRule' }
    // ];

    this.rules = [
      {
        _id: '111111',
        name: 'Rule 1',
        description: 'desc 1',
        type: 'REFERENCE',
        source: 'IN.EEE',
        dest: 'OUT.EEE',
        format: '',
        copyMode: 'APPEND',
        customProcessor: ['custom1'],
        params: 'applicability...',
        ifOkRules: ['RULE091'],
        ifNotOkRules: ['RULE000']
      }
    ]
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

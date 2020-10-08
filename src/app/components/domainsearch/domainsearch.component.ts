import { Component, OnInit } from '@angular/core';
import { DomainService } from '../../services/domain.service';
import { Domain } from '../../models/Domain';

@Component({
  selector: 'app-domainsearch',
  templateUrl: './domainsearch.component.html',
  styleUrls: ['./domainsearch.component.css'],
})
export class DomainsearchComponent implements OnInit {
  constructor(private domainService: DomainService) {}

  domainType = ['.com', '.net', '.org'];

  model = new Domain('', '', '');

  submitted = false;

  public xmlItems: any;

  ngOnInit(): void {
    // this.domainService.parseXML(this.xmlItems).subscribe();
  }

  callType(value) {
    console.log(value);
    this.model.domainType = value;
  }

  onSubmit() {
    this.submitted = true;
    // this.checkDomain(this.model.domainName + this.model.domainType);
    this.domainService.checkDomain(
      this.model.domainName + this.model.domainType
    );
  }
  get diagnostic() {
    return `Your searching for:" www.${this.model.domainName}${this.model.domainType} "`;
  }
}

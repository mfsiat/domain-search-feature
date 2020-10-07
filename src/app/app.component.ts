import { Component } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Domain } from './domain';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  httpData;
  public xmlItems: any;

  constructor(private http: HttpClient) {}

  domainType = ['.com', '.net', '.org'];

  model = new Domain('', '', '');

  submitted = false;

  callType(value) {
    console.log(value);
    // this.order.type=value;
    // this.domainType = value;
    this.model.domainType = value;
    // this.domain_name = this.model.domainName + this.model.domainType;
  }
  onSubmit() {
    this.submitted = true;
    this.checkDomain(this.model.domainName + this.model.domainType);
  }

  // credentials
  ApiUser = 'softopark';
  // domain_name = 'dsadasdasdad';
  ApiKey = '651498aa5e3d40a79826fab2c1cd4e49';
  Command = 'namecheap.domains.check';
  ClientIp = '103.218.26.135';

  // function to check domain
  checkDomain(domainFullName) {
    this.http
      .get(
        `https://api.namecheap.com/xml.response?ApiUser=${this.ApiUser}&ApiKey=${this.ApiKey}&UserName=softopark&ClientIp=${this.ClientIp}&Command=${this.Command}&DomainList=${domainFullName}`,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'text/xml')
            .append('Access-Control-Allow-Methods', 'GET')
            .append(
              'Access-Control-Allow-Origin',
              'https://api.namecheap.com/xml.response'
            )
            .append(
              'Access-Control-Allow-Headers',
              'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
            ),
          responseType: 'text',
        }
      )
      .subscribe((data) => {
        this.parseXML(data).then((data) => {
          this.xmlItems = data;
        });
      });
  }
  ngOnInit() {}

  parseXML(data) {
    return new Promise((resolve) => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
      // var parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(data, function (err, result) {
        var obj = result.ApiResponse;
        for (k in obj.CommandResponse) {
          var item = obj.CommandResponse[k];
          arr.push({
            Name: item.DomainCheckResult[0]['$']['Domain'],
          });
        }
        resolve(arr);
        var obj = result.ApiResponse;
        for (k in obj.CommandResponse) {
          var item = obj.CommandResponse[k];
          arr.push({
            Available: item.DomainCheckResult[0]['$']['Available'],
          });
        }
        resolve(arr);
        // resolve(JSON.stringify(arr));
        console.log(JSON.stringify(item.DomainCheckResult));
      });
    });
  }

  // fireEvent(e) {
  //   console.log('Button Clicked');
  //   console.log(e.type);
  //   console.log(e.target.value);
  // }

  // onSubmit(e) {
  //   console.log(e.target.value);
  //   e.preventDefault();
  // }

  get diagnostic() {
    // return `Your searching for: ` + JSON.stringify(this.model);
    return `Your searching for:" ${this.model.domainName}${this.model.domainType} "`;
  }
}

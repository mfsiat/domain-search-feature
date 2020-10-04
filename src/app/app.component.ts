import { Component } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  httpData;
  // name;
  // searchparam = 2;
  // ngOnInit() {
  //   this.http
  //     .get('http://jsonplaceholder.typicode.com/users?id=' + this.searchparam)
  //     .subscribe((data) => this.displaydata(data));
  // }
  public xmlItems: any;
  constructor(private http: HttpClient) {}

  ApiUser = 'softopark';
  domain_name = 'wowweber.com';
  ApiKey = '651498aa5e3d40a79826fab2c1cd4e49';
  Command = 'namecheap.domains.check';
  ClientIp = '103.218.26.135';
  // ClientIp = '127.0.0.1:4200';
  // ngOnInit() {
  //   this.http.get(
  //     `https://api.namecheap.com/xml.response?ApiUser=softopark&ApiKey=651498aa5e3d40a79826fab2c1cd4e49&UserName=softopark&ClientIp=103.218.26.135&Command=namecheap.domains.check&DomainList=${this.domain_name}`
  //   );
  //   // .subscribe((data) => this.displayData(data));
  // }
  // displayData(data) {
  //   this.httpData = data;
  // }
  ngOnInit() {
    this.http
      .get(
        `https://api.namecheap.com/xml.response?ApiUser=${this.ApiUser}&ApiKey=${this.ApiKey}&UserName=softopark&ClientIp=${this.ClientIp}&Command=${this.Command}&DomainList=${this.domain_name}`,
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
            Available: item.DomainCheckResult[0]['$']['Available'],
            PremiumRegistrationPrice:
              item.DomainCheckResult[0]['$']['PremiumRegistrationPrice'],
          });
        }
        resolve(arr);
        var obj = result.ApiResponse;
        for (k in obj.CommandResponse) {
          var item = obj.CommandResponse[k];
          arr.push({
            Name: item.DomainCheckResult[0]['$']['Domain'],
            Available: item.DomainCheckResult[0]['$']['Available'],
            PremiumRegistrationPrice:
              item.DomainCheckResult[0]['$']['PremiumRegistrationPrice'],
          });
        }
        resolve(arr);
        // resolve(JSON.stringify(arr));
        console.log(JSON.stringify(item.DomainCheckResult));
      });
    });
  }
}

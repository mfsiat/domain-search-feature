import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private http: HttpClient) {}

  httpData;
  public xmlItems: any;
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

  parseXML(data) {
    return new Promise((resolve) => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
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
}

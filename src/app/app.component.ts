import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  readonly ROOT_URL =
    'https://api.namecheap.com/xml.response?ApiUser=softopark&ApiKey=651498aa5e3d40a79826fab2c1cd4e49&UserName=softopark&ClientIp=103.218.26.135&Command=namecheap.domains.check&DomainList=';

  posts: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + 'blogsoftopark.com');
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DomainsearchComponent } from './components/domainsearch/domainsearch.component';
import { DomainService } from './services/domain.service';
@NgModule({
  declarations: [AppComponent, DomainsearchComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DomainService],
  bootstrap: [AppComponent],
})
export class AppModule {}

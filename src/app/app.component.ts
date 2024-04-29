import { Component, OnInit } from '@angular/core';
// import { TimezoneServiceService } from './timezone-service.service';
import moment from 'moment-timezone';
import { Moment } from 'moment';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { monitorEventLoopDelay } from 'perf_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //api calling
  timeZones: string[] = [];
  FromZone: string | any;
  SelectedDate: string | any;
  ToZone: string | any;
  conversionResult: any;
  SelectedDatelibrary:string | any;
  convertedDateTime: string | any;
//
  users: any;
  public tzNames: string[];
  public selectedTz: string | any;
  public utcDate: string | any;
  public tzDate: string | any;
  public userInputDate: string | any;
  public selectedT: string | any;
  public SelectedDate1: string | any; 

  constructor(private api: ApiService) {
    this.tzNames = moment.tz.names();
    this.timeZoneChanged('Asia/Kolkata');
  }

  public timeZoneChanged(timeZone: string): void {
    this.selectedTz = timeZone;
    console.log(this.selectedTz)
    this.updateTime(timeZone);
  }
  private updateTime(timeZone: string): void {
    const currentTime = this.userInputDate;
   this.utcDate = moment(currentTime).utc();
   this.tzDate = moment(currentTime).tz(timeZone);
   console.log(this.tzDate)
  }
  onTimeZoneChange(event: any): void {
    console.log('Selected Time Zone:', event.target.value);
  }

   //api get the data 
   ngOnInit(): void {
    this.fetchTimeZones();
  }

  fetchTimeZones(): void {
    this.api.get().subscribe(
      (data) => {
        this.timeZones = data;
      },
      (error) => {
        console.error('Error fetching time zones:', error);
      }
    );
  }
  convertTime(): void {
    const requestData = {
      fromTimezone: this.FromZone,
      fromDateTime: this.SelectedDate,
      toTimeZone: this.ToZone
    };
  console.log(requestData);
  const inputDateTime = moment(requestData.fromDateTime);
  this.convertedDateTime = inputDateTime.tz(requestData.toTimeZone);
  // Display the converted date-time
   console.log('Converted Date-Time:', this.convertedDateTime.format());
   }
}


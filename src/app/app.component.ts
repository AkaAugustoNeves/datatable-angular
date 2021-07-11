import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'app';
  dtOptions: DataTables.Settings = {};
  persons: Person[]= [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'applicationjson' })
  }

  dtTrigger: Subject<any> = new Subject<any>()

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void{
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 1
    };
    this.httpClient.get<Person[]>('/api/person', this.httpOptions)
      .subscribe(data =>{
        
        this.persons = data;
        console.log(this.persons);
        this.dtTrigger.next();
      });
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }
}

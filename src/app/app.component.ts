 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public users?: any;
  constructor(private http: HttpClient) {
    
  }

    ngOnInit(){
      this.getUsers();
    }

  title = "NewDatingApp";

  private getUsers() {
    this.http.get('/api/users').subscribe({
      next: result => this.users = result,
      error: error => console.error(error)
    });

      
    }
}




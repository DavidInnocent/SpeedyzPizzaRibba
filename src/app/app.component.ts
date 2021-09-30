import { Component } from '@angular/core';


interface User{
  username:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrototypPizza';
  
}

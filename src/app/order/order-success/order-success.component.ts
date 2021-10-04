import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  router: Router;

  
  constructor(router:Router) {
    this.router=router;
   }

  ngOnInit(): void {
  }
  buyAnotherPizza(){
    this.router.navigateByUrl('configurator',{ replaceUrl: true });
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  
  constructor(public orderService:OrderHistoryService) { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfiguratorComponent } from './order/configurator/configurator.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'sign_up',component:SignUpComponent},
  {path:'log_in',component:LoginComponent},
  {path:'configurator',component:ConfiguratorComponent},
  {path:'order_history',component:OrderHistoryComponent},
  {path:'order_details',component:OrderDetailsComponent},
  {path:'order_success',component:OrderSuccessComponent},
  {path:'error',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule, PERSISTENCE } from "@angular/fire/compat/auth";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { ConfiguratorComponent } from './order/configurator/configurator.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from './auth/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavigationComponent,
    ErrorComponent,
    ConfiguratorComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    OrderSuccessComponent,
    LoadingComponent,
  ],
  imports: [
    MatInputModule,
    
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,   
    MatCardModule, 
    AngularFirestoreModule.enablePersistence(), 
    FontAwesomeModule,
    ToastrModule.forRoot(),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

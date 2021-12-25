import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { CustomerService } from 'src/app/modules/admin/people/services/customer.service';
import { Customer } from '../../models/customer';
import { CartService } from '../../services/cart.service';
import { PosService } from '../../services/pos.service';
import { CustomerSelectionComponent } from '../customer-selection/customer-selection.component';

@Component({
  selector: 'app-pos-toolbar',
  templateUrl: './pos-toolbar.component.html',
  styleUrls: ['./pos-toolbar.component.scss']
})
export class PosToolbarComponent implements OnInit {
  customer: Customer;
  cartItemCount: number = 0;
  constructor(private localStorageService: LocalStorageService, public dialog: MatDialog, private posService: PosService, private cartService: CartService, private themeService: ThemeService) { }
  @Input() cart: MatSidenav;
  @Input() darkModeIcon: string;
  @Input() isDarkMode: boolean;
  ngOnInit(): void {
    this.customer=new Customer()
    this.customer.id='07c2d4ca-9bc7-4d3c-8c37-28cac149c9a8';
    this.customer.name='Walk-In-Client'
    this.cartService.setCurrentCustomer(this.customer);
    this.cartService.getCustomerCart(this.customer.id);
    this.cartService.get().subscribe(res => this.cartItemCount = res.length);
    this.cartService.getCurrentCustomer().subscribe(res=>this.customer = res);
    let themeVariant = this.localStorageService.getItem('themeVariant');
    this.darkModeIcon = themeVariant === 'dark-theme' ? 'bedtime' : 'wb_sunny';
    this.isDarkMode = themeVariant === 'dark-theme';
  }
  toggleDarkMode() {
    this.isDarkMode = this.themeService.toggleDarkMode();
    this.darkModeIcon = this.isDarkMode ? 'bedtime' : 'wb_sunny'
  }
  removeCustomer() {
    if (this.customer) {
      this.customer = null;
    }
  }

   

  openCustomerSelectionForm() {
    const dialogRef = this.dialog.open(CustomerSelectionComponent);
    dialogRef.afterClosed().subscribe((customer: Customer) => {
      console.log(customer)
      if (customer) {
        this.customer = customer;
        this.cartService.setCurrentCustomer(customer);
        this.cartService.getCustomerCart(customer.id);
      }
    });
  }
}

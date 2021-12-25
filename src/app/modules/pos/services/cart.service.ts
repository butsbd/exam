import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartApiService } from 'src/app/core/api/cart/cart-api.service';
import { CartItemsApiService } from 'src/app/core/api/cart/cart-items-api.service';
import { CartItemApiModel } from 'src/app/core/models/cart/cart-item';
import { CartItem } from '../models/cart';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$ = new Subject<CartItem[]>();
  private cartItems: CartItem[] = [];
  public currentCustomer: Customer;
  public currentCustomer$ = new Subject<Customer>();
  public cartId: string;
  public isCartLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCartInvalid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public IsProductBeingAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private cartApi: CartApiService, private cartItemApi: CartItemsApiService, private cartItemsApi: CartItemsApiService, private toastr: ToastrService) { }
  
  private updateCart(cartItemId: string, productId: string, quantity: number,price:number, productName:string,) {
    this.IsProductBeingAdded.next(true);
    var cartItem = new CartItemApiModel(this.cartId, productId, quantity,price,productName);
    cartItem.id = cartItemId;
    this.cartItemApi.update(cartItem).subscribe((res) => this.toastr.info('Cart item Updated', '', {
      positionClass: 'toast-top-right'
    })).add(() => this.IsProductBeingAdded.next(false));
  }
  private deleteFromCart(cartItemId: string) {
    this.cartItemApi.delete(cartItemId).subscribe((res) => this.toastr.info('Cart Item Deleted', '', {
      positionClass: 'toast-top-right'
    }));
  }
  clearCart()
  {
    var cartId = this.cartId;
    this.cartApi.clear(cartId).subscribe(() => {
      this.cartItems = [];
      this.cartItems$.next(this.cartItems);
    });
  }
  reset() {
    this.cartItems = [];
    this.cartItems$.next(this.cartItems);
    this.currentCustomer = null;
    this.currentCustomer$.next(this.currentCustomer);
    this.cartId = null;
    this.isCartInvalid.next(true);
  }
  add(product: any, quantity: number = 1) {
    if (!this.cartId) { return; }

    this.IsProductBeingAdded.next(true);
    var foundItem = this.cartItems.find(a => a.productId == product.id);
    if (foundItem) {
      foundItem.quantity = foundItem.quantity + quantity;
      this.updateCart(foundItem.id, foundItem.productId, foundItem.quantity,foundItem.price,foundItem.productName);
    }
    else {
      this.cartItems.push(new CartItem(product.id, quantity ?? 1, product.mrp,product.name));
      var cartItem = new CartItemApiModel(this.cartId, product.id, quantity,product.mrp,product.name);
      this.cartItemApi.create(cartItem).subscribe((res) => {
        if (res) {
          this.toastr.info('Product Added to Cart', '', {
            positionClass: 'toast-top-right'
          });
          var foundItem = this.cartItems.find(a => a.productId == product.id);
          if (foundItem) {
            foundItem.id = res.id;
          }
        }
      }).add(()=>this.IsProductBeingAdded.next(false));
    }
    this.cartItems$.next(this.calculate(this.cartItems));


  }
  increase(productId: string, quantity: number = 1) {
    console.log(this.cartItems)
    if (!this.cartId) { return; }
    var foundItem = this.cartItems.find(a => a.productId == productId);
    if (foundItem) {
      foundItem.quantity = foundItem.quantity + quantity;
      this.updateCart(foundItem.id, foundItem.productId, foundItem.quantity,foundItem.price,foundItem.productName);
    }
    this.cartItems$.next(this.calculate(this.cartItems));
  }


  reduce(productId: string, quantity: number = 1) {
    var foundItem = this.cartItems.find(a => a.productId == productId);
    if (!this.cartId) { return; }
    if (foundItem) {
      if (foundItem.quantity > 1) {
        foundItem.quantity = foundItem.quantity - quantity;
        this.updateCart(foundItem.id, foundItem.productId, foundItem.quantity,foundItem.price,foundItem.productName);
      }
      else {
        this.cartItems.splice(this.cartItems.indexOf(foundItem), 1);
        this.deleteFromCart(foundItem.id);
      }
    }
    this.cartItems$.next(this.calculate(this.cartItems));
  }

  remove(productId: string) {
    if (!this.cartId) { return; }
    var foundItem = this.cartItems.find(a => a.productId == productId);
    if (foundItem) {
      this.cartItems.splice(this.cartItems.indexOf(foundItem), 1);
      this.deleteFromCart(foundItem.id);
    }
    this.cartItems$.next(this.cartItems);
  }
  get(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }
  loadCurrentCart(): CartItem[] {
    return this.calculate(this.cartItems);
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
    this.currentCustomer$.next(this.currentCustomer);
    this.isCartInvalid.next(false);
  }
  getCurrentCustomer() {
    return this.currentCustomer$.asObservable();
  }
  private calculate(cartItems: CartItem[]): CartItem[] {
    cartItems.forEach(function (part, index, theArray) {
      theArray[index].total = cartItems[index].quantity * cartItems[index].price;
    });
    return cartItems;
  }
  getCustomerCart(customerId: string) {
    this.cartItems = [];
    this.isCartLoading.next(true);
    this.cartItems$.next(this.calculate(this.cartItems));
    this.cartApi.getCartByCustomerId(customerId).subscribe((result) => {
    //  console.log(result)
    
        if (result) {
          //take first only - temporarily
          //todo : add cart selection dialog later
          this.cartId = result.id;
          this.cartItemApi.get(this.cartId).subscribe((data) => {
            console.log(data)
            if (data) {
              data.forEach(element => {
                var cartItem = new CartItem(element.productId, element.quantity, element.price,element.productName);
                cartItem.id = element.id;
                this.cartItems.push(cartItem);
                this.cartItems$.next(this.calculate(this.cartItems));
              });
              this.isCartLoading.next(false);
            }
            else {
              this.isCartLoading.next(false);
            }
          });
        }
        else {
         // alert('ok')
          //create cart
          this.cartApi.create(customerId).subscribe((data) => {
            if (data) {
              //this.toastr.info(data.messages[0]);
              this.isCartLoading.next(false);
              this.cartId = data.id;
              this.cartItems$.next(this.calculate(this.cartItems));
            }
          })
        }
      

    });
  }
}

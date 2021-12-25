import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from 'src/app/core/models/identity/token';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Result } from '../models/wrappers/Result';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private baseUrl = environment.apiUrl;
 //private baseUrl = 'http://103.91.229.10/pms/api';
  private currentUserTokenSource = new BehaviorSubject<string>(this.getStorageToken);
  public currentUserToken$ = this.currentUserTokenSource.asObservable();

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router, private toastr: ToastrService) {
  }

  public get getToken(): string {
    return this.currentUserTokenSource.getValue();
  }

  public get getStorageToken(): string {
    return localStorage.getItem('token') ?? null;
  }

  public get getFullName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.unique_name ?? '';
  }
   public get getUserId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.nameid ?? '';
  }

  public get getEmail(): string {
    const decodedToken = this.getDecodedToken();
    return !!(decodedToken) ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] : '';
  }

  public get isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!!(token)) {
      const jwtService = new JwtHelperService();
      return !jwtService.isTokenExpired(token);
    }
    return false;
  }

  public isAuthorized(authorizationType: string, allowedData: string[]): boolean {
    if (allowedData == null || allowedData.length === 0) {
      return true;
    }
    const decodeToken = this.getDecodedToken();
    console.log('arif role permission',decodeToken)
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }

    // if(authorizationType === 'Role') {
    //   const roles = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    //   if (roles === undefined || roles.length === 0) return false;
    //   return allowedData.some(a => roles.includes(a));

    // } 
     if(authorizationType === 'Role') {
      
      return decodeToken.role==='Admin'?true:false;

    } 
    else if (authorizationType === 'Permission') {
      const permissions = decodeToken['Permission'];
      if (permissions === undefined || permissions.length === 0) return false;
      return allowedData.some(a => permissions.includes(a));
    }
  }

  private get getStorageRefreshToken(): string {
    return this.localStorage.getItem('refreshToken');
  }

  public loadCurrentUser(): Observable<string> {
    const token = this.getStorageToken;
    const currentUserToken = !!(token) ? token : null;
    this.setToken(currentUserToken);
    return of(currentUserToken);
  }

  // public login(values: { email: string, password: string }): Observable<Result<Token>> {
  //   return this.http.post(this.baseUrl + 'identity/tokens', values)
  //     .pipe(
  //       tap((result: Result<Token>) => {
  //         if (result?.succeeded === true) {
  //           this.setStorageToken(result.data);
  //           this.toastr.clear();
  //           this.toastr.info('User Logged In');
  //         }
  //       }),
  //       map((result: Result<Token>) => result ?? undefined)
  //     );
  // }

   public login(values: { email: string, password: string }): Observable<Result<Token>> {
    return this.http.post(this.baseUrl + 'auth/login', values)
      .pipe(
        tap((result: any) => {
          console.log(result)
          if (result?.succeeded === true) {
            this.setStorageToken(result?.data);
            this.toastr.clear();
            this.toastr.info('User Logged In');
          }
        }),
        map((result: Result<Token>) => result ?? undefined)
      );
  }

  public logout(): void {
    this.setStorageToken(null);
    this.toastr.clear();
    this.toastr.info('User Logged Out');
    this.router.navigateByUrl('/login');
  }

  public tryRefreshingToken(): void {
    const jwtToken = this.getStorageToken ?? '';
    const refreshToken = this.getStorageRefreshToken ?? '';

    this.http.post(this.baseUrl + 'identity/tokens/refresh', {
      'refreshToken': refreshToken,
      'token': jwtToken
    })
      .pipe(
        tap((result: Result<any>) => {
          if (result.succeeded) {
            this.setStorageToken(result.data);
            this.toastr.clear();
            this.toastr.info('Refreshed Token');
          } else {
            this.logout();
            this.toastr.error('Something went wrong!');
          }
        }),
        catchError((error) => {
          console.error(error);
          this.logout();
          return of(null);
        }))
      .subscribe();
  }

  private setToken(token: string | null) {
    this.currentUserTokenSource.next(token);
  }

  private setStorageToken(data: string) {
    if (data != null && data?.length > 0) {
      this.localStorage.setItem('token', data);
  //    this.localStorage.setItem('refreshToken', data.refreshToken);
      this.setToken(data);
    } else {
      this.localStorage.removeItem('token');
     // this.localStorage.removeItem('refreshToken');
      this.setToken(null);
    }
  }

  private getDecodedToken() {
    let token = this.getStorageToken;
    // if token is undefined, avoid exception
    if (!(token)) {
      return null;
    }
    const jwtService = new JwtHelperService();
    const decodedToken = jwtService.decodeToken(token);
    return decodedToken;
  }



}

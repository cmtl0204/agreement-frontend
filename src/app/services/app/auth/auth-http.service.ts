import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {LoginModel, PasswordChangeModel, PasswordResetModel, UpdateUserDto, UserModel} from '@models/auth';
import {LoginResponse, ServerResponse} from '@models/http-response';
import {AuthService} from '@servicesApp/auth';
import {CoreService, MessageService} from '@servicesApp/core';
import {RoutesService} from "@servicesApp/core";
import {CataloguesHttpService, LocationsHttpService} from "@servicesHttp/core";
import {RolePipe} from "@shared/pipes";

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {
  API_URL: string = `${environment.API_URL}/auth`;
  rolePipe: RolePipe = new RolePipe();

  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService,
              private readonly coreService: CoreService,
              private readonly cataloguesHttpService: CataloguesHttpService,
              private readonly locationsHttpService: LocationsHttpService,
              private readonly router: Router,
              private readonly routesService: RoutesService,
              private readonly messageService: MessageService) {
  }

  signup(userData: UserModel): Observable<UserModel> {
    const url = `${this.API_URL}/patients/users`;
    console.log('signup');
    // //this.appService.presentLoading();
    return this.httpClient.post<ServerResponse>(url, userData)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        }),
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      );
  }

  changePassword(id: string, credentials: PasswordChangeModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/${id}/change-password`;
    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, credentials)
      .pipe(
        map(response => {
          this.coreService.isProcessing = false;
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  login(credentials: LoginModel): Observable<LoginResponse> {
    const url = `${this.API_URL}/login`;

    this.loadCatalogues();
    // this.findLocations();

    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => {
          this.authService.token = response.data.token;
          this.authService.auth = response.data.user;
          return response;
        })
      );
  }

  loadCatalogues() {
    this.cataloguesHttpService.loadCache();
  }

  findLocations() {
    let locations = sessionStorage.getItem('locations');

    if (!locations || this.coreService.version !== this.coreService.newVersion) {
      this.locationsHttpService.findCache().subscribe();
    }
  }

  signOut(): void {
    console.log('signOut');
    this.authService.removeLogin();
    this.messageService.successCustom('Cerrar Sesión', 'Se cerró correctamente');
    this.router.navigate(['/login']);
    /*
    const url = `${this.API_URL}/logout`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => {
          this.authService.removeLogin();
          return response.data;
        }),
        tap(() => {
          this.routesService.login();
        })
      );
      */
  }

  loginGoogle(): Observable<LoginResponse> {
    // const url = `${this.URL_PUBLIC}/login/google`;
    const url = `${this.API_URL}/login/google`;
    return this.httpClient.get<LoginResponse>(url);
  }

  resetPassword(credentials: PasswordResetModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reset-passwords`;
    return this.httpClient.patch<ServerResponse>(url, credentials)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response;
        })
      );
  }

  verifyUser(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-user/${username}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyEmail(email: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-email/${email}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyPhone(phone: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-phone/${phone}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  requestTransactionalCode(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/transactional-codes/${username}/request`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  verifyTransactionalCode(token: string, username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/transactional-codes/${token}/verify`;
    return this.httpClient.patch<ServerResponse>(url, {username})
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  getProfile(): Observable<UserModel> {
    const url = `${this.API_URL}/profile`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {

        return response.data;
      })
    );
  }

  getUserInformation(): Observable<UserModel> {
    const url = `${this.API_URL}/user-information`;


    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {

        return response.data;
      })
    );
  }

  updateProfile(payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/profile`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  updateUserInformation(payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/user-information`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  uploadAvatar(id: string, payload: FormData): Observable<UserModel> {
    const url = `${this.API_URL}/${id}/avatar`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}

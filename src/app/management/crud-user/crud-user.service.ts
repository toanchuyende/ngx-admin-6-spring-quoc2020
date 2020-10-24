import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataPost } from "app/models/data-post";
import { MessageService } from "app/models/message.service";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class CrudUserService {
  static currentItem: DataPost = null;

  // private url = environment.apiUrl + '/api/BaiBoiApi';  // URL to web api
  private urlApi = "http://auth.kenhthongtinsinhvien.com/post"; // URL to web api
  private urlApiController = "http://auth.kenhthongtinsinhvien.com/api/post"; // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET All items from the server */
  getAll(): Observable<any> {
    //
    return this.http.get<any>(this.urlApi).pipe(
      tap((data) => {
        this.log(`fetched /**`);
      }),
      catchError(this.handleError("/**", []))
    );
  }

  /** GET All items from the server */
  getOne(id: String): Observable<any> {
    //
    return this.http.get<any>(`${this.urlApi}/${id}`).pipe(
      tap((data) => {
        this.log(`fetched /**`);
      }),
      catchError(this.handleError("/**", []))
    );
  }

  create(item: DataPost): Observable<any> {
    const url = `${this.urlApiController}/create`;
    return this.http.post<DataPost>(url, item, httpOptions).pipe(
      tap((itemReturned: any) => this.log(`created w/ id=${itemReturned.id}`)),
      catchError(this.handleError<any>("created"))
    );
  }

  /** EDIT: edit the item from the server */
  update(id: String, item: DataPost): Observable<any> {
    const url = `${this.urlApiController}/edit/${id}`;
    return this.http.put<DataPost>(url, item, httpOptions).pipe(
      tap((itemEdited: any) => this.log(`updateed w/ id=${itemEdited.id}`)),
      catchError(this.handleError<any>("update"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add("HeroService: " + message);
  }
}

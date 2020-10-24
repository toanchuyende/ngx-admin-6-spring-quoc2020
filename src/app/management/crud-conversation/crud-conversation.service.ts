import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
import { DataConversation } from "app/models/data-conversation";
import { MessageService } from "app/models/message.service";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class CrudConversationService {
  static currentItem: DataConversation = null;

  // private url = environment.apiUrl + '/api/BaiBoiApi';  // URL to web api
  private urlApi = "http://news.kenhthongtinsinhvien.com/conversation"; // URL to web api
  private urlApiController =
    "http://news.kenhthongtinsinhvien.com/api/conversation"; // URL to web api

  private urlApiMessage = "http://message.kenhthongtinsinhvien.com"; // URL to web api

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

  /** GET All items from the server */
  getListMessageWithByConversationId(id: String): Observable<any> {
    // http://message.kenhthongtinsinhvien.com/api/message/findByConversationId/5f8b705203f36a29501e1a9c
    return this.http.get<any>(`${this.urlApiMessage}/api/message/findByConversationId/${id}`).pipe(
      tap((data) => {
        this.log(`fetched /**`);
      }),
      catchError(this.handleError("/**", []))
    );
  }

  create(item: DataConversation): Observable<any> {
    const url = `${this.urlApiController}/create`;

    let _token =
      AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.accessToken;
    console.log(AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared);
    let _options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }).append(
        "Authorization",
        `Bearer ${_token}`
      ),
    };

    // _options.headers.append("Authorization", `Bearer ${_token}`);
    return this.http.post<DataConversation>(url, item, _options).pipe(
      tap((itemReturned: any) => this.log(`created w/ id=${itemReturned.id}`)),
      catchError(this.handleError<any>("created"))
    );
  }

  /** EDIT: edit the item from the server */
  update(id: String, item: DataConversation): Observable<any> {
    const url = `${this.urlApiController}/edit/${id}`;

    let _token =
      AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.accessToken;
    console.log(AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared);
    let _options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }).append(
        "Authorization",
        `Bearer ${_token}`
      ),
    };

    return this.http.put<DataConversation>(url, item, _options).pipe(
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

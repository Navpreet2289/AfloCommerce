import { MdSnackBar } from '@angular/material';
import { AfloCrudBaseService } from './base.service';
import { AuthHttp, AuthHttpError } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AfloCrudService extends AfloCrudBaseService {
    private apiPath: string = '/aflo/';
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private authHttp: AuthHttp, private http: Http, private snack: MdSnackBar) {
        super();
    }

    get(api: string, params?: any, auth?: boolean): Observable<any> {
        let http = auth ? this.authHttp : this.http;
        return http.get(this.apiPath + api + '/', { search: params })
            .map(this.extractData)
            .share()
            .catch(this.handleError);
    }

    getOne(api: string, id: string, auth?: boolean, cache?: boolean): Observable<any> {
        if (!this.record.api) {
            this.record.api = {};
        }
        if (!this.record.api.id) {
            this.record.api.id = {};
        }
        if (this.record.api.id && this.record.api.id._id === id && !cache) {
            return Observable.of(this.record.api.id);
        } else {
            let http = auth ? this.authHttp : this.http;
            return http.get(this.apiPath + api + '/' + id)
                .map(this.extractData)
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
        }
    }

    add(api: string, body: any, notdemo?: boolean): Observable<any> | any {

        return this.authHttp.post(this.apiPath + api, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(api: string, body: any, auth: boolean = true, notdemo?: boolean): Observable<any> {

        if (!auth) {
            return this.http.post(this.apiPath + api, body)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.authHttp.post(this.apiPath + api, body)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    put(api: string, body: any, notdemo?: boolean): Observable<any> {

        return this.authHttp.put(`${this.apiPath}${api}`, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    patch(api: string, id: string, body: any, notdemo?: boolean): Observable<any> {

        return this.authHttp.patch(`${this.apiPath}${api}/${id}`, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(api: string, id: string, notdemo?: boolean): Observable<any> {

        return this.authHttp.delete(`${this.apiPath}${api}/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

}

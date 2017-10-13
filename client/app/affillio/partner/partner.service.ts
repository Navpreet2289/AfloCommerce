import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class partnerservice {
    private url: string = '/aflo/partners';
    private partners: any;
    private partner: any = {};
    private observable: Observable<any>;

    constructor(private http: AuthHttp) {
    }
    get(params?: any, cache?: boolean) {
        if (this.partners && !cache && !params) {
            return Observable.of(this.partners);
        } else if (this.observable && !cache && !params) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.url, { search: params })
                .map(res => {
                    this.observable = null;
                    if (res.status == 400) {
                        return "FAILURE";
                    } else if (res.status == 200) {
                        this.partners = res.json();
                        return this.partners;
                    }
                })
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
            return this.observable;
        }
    }

    getOne(id: string, cache?: boolean) {
        if (this.partner[id] && !cache) {
            return Observable.of(this.partner[id]);
        } else if (this.observable && !cache) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.url + '/' + id)
                .map(res => {
                    this.observable = null;
                    if (res.status == 400) {
                        return "FAILURE";
                    } else if (res.status == 200) {
                        this.partner[id] = res.json();
                        return this.partner[id];
                    }
                })
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
            return this.observable;
        }
    }

    post(body: any) {
        //if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.post(this.url, body)
            .map(res => {
                this.partners = null;// Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }

    patch(id: string, body: any) {
        //if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.patch(`${this.url}/${id}`, body)
            .map(res => {
                this.partners = null; this.partner[id] = null;// Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }
    delete(id: string) {
        //if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.delete(`${this.url}/${id}`)
            .map(res => {
                this.partners = null; this.partner[id] = null; // Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status < 200 || error.status >= 300) {
                errMsg = 'This request has failed ' + error.status + ' - ' + error.statusText;
            } else {
                errMsg = `${error.status} - ${error.statusText || ''}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg || 'Server Error');
    }
}

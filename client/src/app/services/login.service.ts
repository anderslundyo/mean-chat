import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }           from '../models/user';
import { Observable }     from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';






@Injectable()
export class LoginService {
    private getUserUrl = 'users/get';  // URL to web API
    private postUserUrl = 'users/post';  // URL to web API
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;
    

    /*
     * Get blog messages from server
     */
    getUsers(): Observable<User[]> {
        console.log("get users kaldt med objekt" +User);
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
                
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
     * Send blog message to server
     */
    addUser (user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        sessionStorage.setItem("sessionUsername", JSON.stringify(user.username));
        console.log("added user to session:" + sessionStorage.getItem("sessionUsername"));
        
        return this.http.post(this.postUserUrl, user, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        console.log("kører data handler")
        let body = res.json();
        console.log("extracted data: "+ JSON.stringify(body));
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
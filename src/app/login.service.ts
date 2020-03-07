import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
}) export class LoginService {
	entity = {};

	constructor(
		private http: HttpClient
	) { }

	logIn() {

	}

	logOut() {

	}
}

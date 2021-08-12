import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IFatura } from "../interfaces/IFatura";

@Injectable({ providedIn: 'root' })
export class FaturaService {

	baseUrl = 'fatura';

	constructor(
		private http: HttpClient
	) { }

	getAll(): Observable<IFatura[]> {
		return this.http.get<IFatura[]>(`${environment.url_api}/${this.baseUrl}`);
	}

	getById(id: number): Observable<IFatura> {
		return this.http.get<IFatura>(`${environment.url_api}/${this.baseUrl}/${id}`);
	}

	post(fatura: IFatura): Observable<IFatura> {
		return this.http.post<IFatura>(`${environment.url_api}/${this.baseUrl}`, fatura);
	}

	delete(id: number) {
		return this.http.delete(`${environment.url_api}/${this.baseUrl}/${id}`);
	}

	put(id: number, fatura: IFatura): Observable<IFatura> {
		return this.http.put<IFatura>(`${environment.url_api}/${this.baseUrl}/${id}`, fatura);
	}
}
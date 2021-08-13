import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUnidadeConsumidora } from "../interfaces/IUnidadeConsumidora";

@Injectable({ providedIn: 'root' })
export class UnidadeConsumidoraService {

	baseUrl = 'unidadeConsumidora';

	constructor(
		private http: HttpClient
	) { }

	getAll(): Observable<IUnidadeConsumidora[]> {
		return this.http.get<IUnidadeConsumidora[]>(`${environment.url_api}/${this.baseUrl}`);
	}

	getById(id: number): Observable<IUnidadeConsumidora> {
		return this.http.get<IUnidadeConsumidora>(`${environment.url_api}/${this.baseUrl}/${id}`);
	}

	post(unidadeConsumidora: IUnidadeConsumidora): Observable<IUnidadeConsumidora> {
		return this.http.post<IUnidadeConsumidora>(`${environment.url_api}/${this.baseUrl}`, unidadeConsumidora);
	}

	delete(id: number) {
		return this.http.delete(`${environment.url_api}/${this.baseUrl}/${id}`);
	}

	put(id: number, unidadeConsumidora: IUnidadeConsumidora): Observable<IUnidadeConsumidora> {
		return this.http.put<IUnidadeConsumidora>(`${environment.url_api}/${this.baseUrl}/${id}`, unidadeConsumidora);
	}
}
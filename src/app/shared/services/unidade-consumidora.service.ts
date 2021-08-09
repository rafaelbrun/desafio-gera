import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUnidadeConsumidora } from "../interfaces/IUnidadeConsumidora";

@Injectable({ providedIn: 'root' })
export class UnidadeConsumidoraService {
	constructor(
		private http: HttpClient
	) { }

	getAll(): Observable<IUnidadeConsumidora[]> {
		return this.http.get<IUnidadeConsumidora[]>(`${environment.url_api}/unidadeConsumidora`);
	}
}

import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { environment } from '@environments/environment';
import { IUnidadeConsumidora } from '../interfaces/IUnidadeConsumidora';
import { UnidadeConsumidoraService } from "./unidade-consumidora.service";


describe('UnidadeConsumidoraService', () => {

	let unidadeConsumidoraService: UnidadeConsumidoraService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [
				UnidadeConsumidoraService
			]
		});

		unidadeConsumidoraService = TestBed.inject(UnidadeConsumidoraService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should retrieve all unidades consumidoras', () => {
		const mockUnidadesConsumidoras: IUnidadeConsumidora[] = [
			{
				id: 1,
				nome: 'Unidade 01',
				distribuidora: 'DIST',
				endereco: 'Rua sao paulo',
				numero: '123123'
			},
			{
				id: 2,
				nome: 'Unidade 02',
				distribuidora: 'TSID',
				endereco: 'Rua das flores',
				numero: '321321'
			}
		];

		unidadeConsumidoraService.getAll().subscribe(unidade => {
			expect(unidade[0].id).toEqual(mockUnidadesConsumidoras[0].id);
			expect(unidade[1].id).toEqual(mockUnidadesConsumidoras[1].id);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora`);

		expect(req.request.method).toEqual('GET');

		req.flush(mockUnidadesConsumidoras);
	});

	it('should retrieve one unidade consumidora', () => {
		const mokcUnidadeConsumidora: IUnidadeConsumidora[] = [{
			id: 1,
			nome: 'Unidade 01',
			distribuidora: 'DIST',
			endereco: 'Rua sao paulo',
			numero: '123123'
		}];

		unidadeConsumidoraService.getById(1).subscribe(unidade => {
			expect(unidade).toEqual(mokcUnidadeConsumidora);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora/${1}`);

		expect(req.request.method).toEqual('GET');

		req.flush(mokcUnidadeConsumidora);
	});

	it('should save new unidade consumidora', () => {
		const mockUnidadeConsumidora: IUnidadeConsumidora = {
			nome: 'Unidade 01',
			distribuidora: 'DIST',
			endereco: 'Rua sao paulo',
			numero: '123123'
		};

		unidadeConsumidoraService.post(mockUnidadeConsumidora).subscribe(unidade => {
			expect(unidade).toEqual(mockUnidadeConsumidora);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora`);

		expect(req.request.method).toEqual('POST');
		expect(req.request.body.nome).toEqual(mockUnidadeConsumidora.nome);

		req.flush(mockUnidadeConsumidora);
	});

	it('should give an error if save unidade fails', () => {
		const mockUnidadeConsumidora: IUnidadeConsumidora = {
			nome: 'Unidade 01',
			distribuidora: 'DIST',
			endereco: 'Rua sao paulo',
			numero: '123123'
		};

		unidadeConsumidoraService.post(mockUnidadeConsumidora).subscribe(() => {
			fail('the save unidade operation should have failed');
		}, (error: HttpErrorResponse) => {
			expect(error.status).toBe(500);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora`);

		expect(req.request.method).toEqual('POST');

		req.flush(
			'Save unidade failed',
			{
				status: 500,
				statusText: 'Internal Server Error'
			}
		);
	});

	it('should edit existent unidade consumidora', () => {
		const mockUnidadeConsumidora: IUnidadeConsumidora = {
			id: 1,
			nome: 'Unidade 01',
			distribuidora: 'DIST',
			endereco: 'Rua das flores',
			numero: '123123'
		};

		unidadeConsumidoraService.put(mockUnidadeConsumidora.id, mockUnidadeConsumidora).subscribe(unidade => {
			expect(unidade).toEqual(mockUnidadeConsumidora);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora/${mockUnidadeConsumidora.id}`);

		expect(req.request.method).toEqual('PUT');
		expect(req.request.body.nome).toEqual(mockUnidadeConsumidora.nome);

		req.flush(mockUnidadeConsumidora);
	});

	it('should give an error if edit unidade fails', () => {
		const mockUnidadeConsumidora: IUnidadeConsumidora = {
			id: 1,
			nome: 'Unidade 01',
			distribuidora: 'DIST',
			endereco: 'Rua das flores',
			numero: '123123'
		};

		unidadeConsumidoraService.put(mockUnidadeConsumidora.id, mockUnidadeConsumidora).subscribe(() => {
			fail('the save unidade operation should have failed');
		}, (error: HttpErrorResponse) => {
			expect(error.status).toBe(500);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora/${mockUnidadeConsumidora.id}`);

		expect(req.request.method).toEqual('PUT');

		req.flush(
			'Save unidade failed',
			{
				status: 500,
				statusText: 'Internal Server Error'
			}
		);
	});

	it('should delete unidade consumidora', () => {
		const id = 1;

		unidadeConsumidoraService.delete(id).subscribe();

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora/${id}`);

		expect(req.request.method).toEqual('DELETE');

		req.flush(id, { status: 200, statusText: 'success' });
	});

	it('should give an error if delete unidade fails', () => {
		const id = 1;

		unidadeConsumidoraService.delete(id).subscribe(() => {
			fail('the save unidade operation should have failed');
		}, (error: HttpErrorResponse) => {
			expect(error.status).toBe(500);
		});

		const req = httpTestingController.expectOne(`${environment.url_api}/unidadeConsumidora/${id}`);

		expect(req.request.method).toEqual('DELETE');

		req.flush(
			'Delete unidade failed',
			{
				status: 500,
				statusText: 'Internal Server Error'
			}
		);
	});


	afterEach(() => {
		httpTestingController.verify();
	});
});
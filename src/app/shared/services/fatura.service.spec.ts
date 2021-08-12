
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { environment } from '@environments/environment';
import { IFatura } from '../interfaces/IFatura';
import { FaturaService } from './fatura.service';


describe('FaturaService', () => {

    let faturaService: FaturaService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                FaturaService
            ]
        });

        faturaService = TestBed.inject(FaturaService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all faturas', () => {
        const mockFaturas: IFatura[] = [
            {
                id: 1,
                valor: 123,
                consumo: 123,
                unidadeConsumidoraId: 3,
                data_de_vencimento: '11/11/1111'
            },
            {
                id: 2,
                valor: 321,
                consumo: 321,
                unidadeConsumidoraId: 2,
                data_de_vencimento: '12/12/1212'
            }
        ];

        faturaService.getAll().subscribe(fatura => {
            expect(fatura[0].id).toEqual(mockFaturas[0].id);
            expect(fatura[1].id).toEqual(mockFaturas[1].id);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura`);

        expect(req.request.method).toEqual('GET');

        req.flush(mockFaturas);
    });

    it('should retrieve one fatura', () => {
        const mockFatura: IFatura = {
            id: 1,
            valor: 123,
            consumo: 123,
            unidadeConsumidoraId: 3,
            data_de_vencimento: '11/11/1111'
        };

        faturaService.getById(1).subscribe(fatura => {
            expect(fatura).toEqual(mockFatura);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura/${1}`);

        expect(req.request.method).toEqual('GET');

        req.flush(mockFatura);
    });

    it('should save new fatura', () => {
        const mockFatura: IFatura = {
            id: 1,
            valor: 123,
            consumo: 123,
            unidadeConsumidoraId: 3,
            data_de_vencimento: '11/11/1111'
        };

        faturaService.post(mockFatura).subscribe(fatura => {
            expect(fatura).toEqual(mockFatura);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura`);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body.valor).toEqual(mockFatura.valor);

        req.flush(mockFatura);
    });

    it('should give an error if save fatura fails', () => {
        const mockFatura: IFatura = {
            id: 1,
            valor: 123,
            consumo: 123,
            unidadeConsumidoraId: 3,
            data_de_vencimento: '11/11/1111'
        };

        faturaService.post(mockFatura).subscribe(() => {
            fail('the save fatura operation should have failed');
        }, (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura`);

        expect(req.request.method).toEqual('POST');

        req.flush(
            'Save fatura failed',
            {
                status: 500,
                statusText: 'Internal Server Error'
            }
        );
    });

    it('should edit existent fatura', () => {
        const mockFatura: IFatura = {
            id: 1,
            valor: 123,
            consumo: 123,
            unidadeConsumidoraId: 3,
            data_de_vencimento: '11/11/1111'
        };

        faturaService.put(mockFatura.id, mockFatura).subscribe(fatura => {
            expect(fatura).toEqual(mockFatura);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura/${mockFatura.id}`);

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.valor).toEqual(mockFatura.valor);

        req.flush(mockFatura);
    });

    it('should give an error if edit fatura fails', () => {
        const mockFatura: IFatura = {
            id: 1,
            valor: 123,
            consumo: 123,
            unidadeConsumidoraId: 3,
            data_de_vencimento: '11/11/1111'
        };

        faturaService.put(mockFatura.id, mockFatura).subscribe(() => {
            fail('the save fatura operation should have failed');
        }, (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura/${mockFatura.id}`);

        expect(req.request.method).toEqual('PUT');

        req.flush(
            'Save fatura failed',
            {
                status: 500,
                statusText: 'Internal Server Error'
            }
        );
    });

    it('should delete fatura', () => {
        const id = 1;

        faturaService.delete(id).subscribe();

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura/${id}`);

        expect(req.request.method).toEqual('DELETE');

        req.flush(id, { status: 200, statusText: 'success' });
    });

    it('should give an error if delete fatura fails', () => {
        const id = 1;

        faturaService.delete(id).subscribe(() => {
            fail('the save fatura operation should have failed');
        }, (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
        });

        const req = httpTestingController.expectOne(`${environment.url_api}/fatura/${id}`);

        expect(req.request.method).toEqual('DELETE');

        req.flush(
            'Delete fatura failed',
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
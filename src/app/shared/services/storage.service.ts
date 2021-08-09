import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

    public value: any | boolean = false;

    constructor() {
    }

    public getValue(): any | boolean {
        return this.value;
    }

    public setValue(value: any): void {
        this.value = value;
    }
}
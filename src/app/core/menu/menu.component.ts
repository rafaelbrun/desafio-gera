import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isUnidadeConsumidora: boolean = true;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.isUnidadeConsumidora = this.location.path().includes('/unidades-consumidora');
  }

  navigateTo(address: string) {
    this.isUnidadeConsumidora = address === 'unidades-consumidora';
    this.router.navigate([`/${address}`]);
  }
}

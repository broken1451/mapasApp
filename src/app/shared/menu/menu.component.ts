import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menu: MenuItem[] = [
    {
      ruta: '/maps/fullscreen',
      nombre: 'Fullscreen',
    },
    {
      ruta: '/maps/zoomRange',
      nombre: 'Zoom Range',
    },
    {
      ruta: '/maps/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: '/maps/propiedades',
      nombre: 'Propiedades',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

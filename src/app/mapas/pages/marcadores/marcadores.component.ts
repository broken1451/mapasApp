import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss'],
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  public mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  public zoomLvl: number = 15;
  public center: [number, number] = [-70.6337478613707, -33.43797964146549];

  // marcadores
  public marcadores: MarkerColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLvl,
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'hola mundo';

    // const marker = new mapboxgl.Marker({
    //   // element: markerHtml
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  ngOnInit(): void {}

  irMarcador(marcador: MarkerColor) {
    this.mapa.flyTo({
      center: marcador.marker.getLngLat(),
    });
  }

  agregar() {
    // (42).toString(2);     // "101010" (binary)
    // (13).toString(8);     // "15"     (octal)
    // (0x42).toString(10);  // "66"     (decimal)
    // (100000).toString(16) // "186a0"  (hexadecimal)
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker: any = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa);
    this.marcadores.push({
      color,
      marker: newMarker,
    });
  }



  guardarMarkerLocalStorage(){
    // localStorage.setItem()
  }

  leerLocalStorage(){
    
  }
}

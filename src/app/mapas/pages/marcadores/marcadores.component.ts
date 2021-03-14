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
  marker?: mapboxgl.Marker;
  centro?: [number, number];
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

    this.leerLocalStorage();

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
      center: marcador.marker!.getLngLat(),
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
    this.guardarMarkerLocalStorage();
    newMarker.on('dragend', () => {
      this.guardarMarkerLocalStorage();
    });
  }

  guardarMarkerLocalStorage() {
    const lngLatArr: MarkerColor[] = [];
    this.marcadores.forEach((marker) => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat],
        // marker:
      });
    });
    console.log(this.marcadores);
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarkerColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );
    lngLatArr.forEach((marker) => {
      const newMarker = new mapboxgl.Marker({
        color: marker.color,
        draggable: true,
      })
        .setLngLat(marker.centro!)
        .addTo(this.mapa);
      this.marcadores.push({
        marker: newMarker,
        color: marker.color,
      });
      newMarker.on('dragend', () => {
        this.guardarMarkerLocalStorage();
      });
    });
  }

  borrarMarker(i: any) {
    console.log(this.marcadores[i]);
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarkerLocalStorage();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SpotifyService} from '../../service/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {

  loading: boolean;
  //ejemplo de respuesta api
  // paises: any[] = [];//arreglo vacio
  // constructor(private http: HttpClient) {
  //   this.http.get('http://restcountries.eu/rest/v2/lang/es')
  //     .subscribe((resp: any) => {
  //       this.paises = resp;
  //       console.log(resp);
  //     });
  // }

  nuevasCanciones: any[] = [];

  //manejo de errores

  error: boolean;
  mensajeError: String;

  constructor(private spotify: SpotifyService) {

    this.loading = true;

    this.error = false;

    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
      // console.log(data);
      this.nuevasCanciones = data;
      this.loading = false;
    }, ( errorServicio ) => {
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      });
  }
  ngOnInit() {
  }

}

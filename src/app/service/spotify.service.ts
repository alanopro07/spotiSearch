import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';//reactive extensions
//operador map (map solo trabaja con observables)

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient) {
    console.log('servicio listo');
  }

  getQuery( query:string ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA4INh-y6zWXSj0F19v7p_9Zu-xPqWk1pdOwiu9KAP95fRbdvMA2zPQhrHgvbip2Jh9FkSYVRefIWM6YNs'
    });
    return this.http.get(url, { headers });
  }
  //funcion nuevos artistas
  getNewReleases() {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDVlSIzPdVZHk-RocCgft8AoLDMAIHySJw6ODfrmElc-V3R7ZJM4_OUb-3m1yrUzlRESAFxm4VoBdWCSAI'
    // });
    //pipe y map para recibir la informacion
   return this.getQuery('browse/new-releases?limit=20') //codigo mejorado
     .pipe( map( data => data['albums'].items));
    // this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
    //  .pipe( map( data => data['albums'].items));
  }

  //funcion busqueda de artistas
  getArtistas( termino: string )
  {
    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe( map( data => data['artists'].items));

  }

  //funcion busqueda de artista en especificio
  getArtista( id: string ) {
    return this.getQuery(`artists/${ id }`);
      // .pipe( map( data => data['artists'].items));
  }

  //get top tracks
  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
    .pipe( map( data => data['tracks']));
  }
}


import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../service/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent  {

  artista: any = {};// ya no es un arreglo si no un objeto vacio

  topTRacks: any[] = [];

  loadinArtist: boolean;

  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService ) {
    this.loadinArtist = true;
    this.router.params.subscribe( params => {
      console.log(params['id']);
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
      this.loadinArtist = false;
    });
  }

  getArtista( id: string ) {
    this.loadinArtist = true;
    this.spotify.getArtista( id )
      .subscribe( artista => {
        console.log(artista);
        this.artista = artista;
        this.loadinArtist = false;
      });
   }

   getTopTracks( id: string) {
    this.spotify.getTopTracks( id )
      .subscribe( topTracks => {
        console.log(topTracks);
        this.topTRacks = topTracks;
      });
   }

}

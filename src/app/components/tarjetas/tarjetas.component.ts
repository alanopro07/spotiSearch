import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  //relacion con el .ts de home
  @Input() items: any[] = [];//inicializado y vacio

  constructor( private router: Router ) {

  } //router para anejar y hacer redirecciones

  verArtista( item: any ) {
    let artistaId;
    if (item.type === 'artist' ) {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }

    //redireccionamiento con el click
    this.router.navigate(['/artist', artistaId ]);
  }
  ngOnInit() {
  }

}

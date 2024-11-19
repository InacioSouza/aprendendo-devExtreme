import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';



@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})

export class MunicipiosComponent {

  uf: string = '';
  aplicarFiltroUF: boolean = false;

  dataSource?: any;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe( params => {
      this.uf = params['uf'] || '';
      this.aplicarFiltroUF = params['filtro'] === 'true';
    })

    this.dataSource = new CustomStore({

      key: 'id',
      load: () => {

        const filtroUF = this.aplicarFiltroUF ? (municipio: any) => municipio.microrregiao.mesorregiao.UF.sigla = this.uf
        : () => true;

        return fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
          .then((response) => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
          })
          .then((data) => {
            return data.filter(filtroUF);
          })
          .catch((error) => {
            console.error('Erro ao carregar dados:', error);
            throw error;
          })
      }
    });
  };
}

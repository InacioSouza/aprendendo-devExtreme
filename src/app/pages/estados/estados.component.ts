import { Component } from '@angular/core';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'estados.component.html'
})

export class EstadosComponent {
  dataSource: any;

  constructor(private router: Router) {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => {
        return fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then((response) => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.error('Erro ao carregar dados:', error);
            throw error;
          })
      }
    });
  };

  teste(event: any): void {
    console.log("Olá, mundo! " + event.data.Task_Subject)
  }

  municipioUf(uf: string){

    let filtro: boolean = true

    this.router.navigate(['/municipios'], {
      queryParams: {uf, filtro}
    })
  }
}
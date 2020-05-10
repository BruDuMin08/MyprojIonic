import { Component, OnInit } from '@angular/core';

// Serviço de acesso à API
import { UsersService } from '../../services/users.service';

// Infinite scroll
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.page.html',
  styleUrls: ['./listusers.page.scss'],
})
export class ListusersPage implements OnInit {

  // Infinite Scroll
  itemsPage: any = [];
  private readonly offset: number = 10;
  private index = 0;

  // Variável indentifica se temos usuários
  noUsers = false;

  // Variável com a array de usuários obtidos
  data: Array<any> = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    //Obtendo os dados da API
    this.usersService.getUsers().subscribe((res: any) => {

      // Se obteve os dados com sucesso
      if (res.status === 'success') {

        // Loop para descartar usuários removidos
        res.result.forEach((value) => {

          if (value !== null) {
            this.data.push(value);
          }
        });

        // Se não existem usuários
        if (this.data.length === 0) {
          this.noUsers = true;
        
          // Se existem usuários
        } else {

          this.itemsPage = this.data.slice(this.index, this.offset + this.index);
          
          // Próxima página
          this.index += this.offset;
        }

       // Se falhou ao acessar a API
      } else {
        console.error('Falha no acesso à API.');
      }
    });
  }

  // Infinite scroll
  loadData(event) {

    setTimeout(() => {

      // Paginação a cada rolagem
      const news = this.data.slice(this.index, this.offset + this.index);
      this.index += this.offset;

      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < news.length; i ++) {
        this.itemsPage.push(news[i]);
      }

      // concluir o tratamento do evento
      event.target.complete();

      // Encerra a rolagem se atingir o total de elementos
      if (this.itemsPage.length === this.data.length) {
        event.target.disabled = true;
      }

    }, 800);
  }

}

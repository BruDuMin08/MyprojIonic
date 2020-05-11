import { Component, OnInit } from '@angular/core';

// 1) Rotas dinâmicas
import { ActivatedRoute } from '@angular/router';

// 2) Importa modelos dos dados
import { User } from '../../models/users.model';


// 2) Importa o service dos usuários
import { UsersService } from '../../services/users.service';

// importa classe de navegação
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  // 1) Obtém o Id do usuário
  id: string = this.route.snapshot.paramMap.get(`id`);

  // 2) Variável indentifica se temos usuários
   noUser = false;

  // 2) Variável com a array de usuários obtidos
   data: User;

   constructor(

    // 1) Inicializa rotas dinâmicas para obter o Id
    private route: ActivatedRoute,

    // 2) Inicializa o service dos usuários
    private usersService: UsersService,

    // Navegação
    private navCtrl: NavController

  ) { }

  ngOnInit() {

   // console.log('ID: ', this.id);

   // 2) Consultar a API para o Id informado
   this.usersService.getUser(this.id).subscribe(

    (res: any) => {
      console.log(res);

      // 2) Caso a consulta à API falhe...
      if (res.status !== 'success') {
        console.error(`Erro: ${res.result}`);
        return false;
      }

      // 2) Se não retornou ninguém
      if (res.result === 'No record found') {

        // Informa ao HTML quw usuário não existe
        this.noUser = true;
        return false;

        // Se o usuário existe
      } else {

        // Mostra no HTML os dados do usuàrio
        this.data = res.result;
        //console.log(this.data);
      }
    }
   );
  }

  // Ação do botão Editar
  editUser(id: string) {
    alert(`Editando ${id}...`);
  }

  // Ação do botão Apagar
  delUser(id: string, name: string) {

    // Confirmação
    if ( !confirm(`
    Tem certeza que deseja apagar "${name}"?\n    
    Esta ação é irreversível!\n
    Clique em [ok] para apagar e [Cancelar] para não apagar...`
    )) {

      // Sai sem fazer nada
      return false;
    }

    // Apaga o registro com o id informado
    this.usersService.deleteUser(this.id).subscribe(
      (res: any) => {

        // Se apagou
        if (res.status === 'success' && res.result === 'Record deleted successfully') {

          // Feedback
          alert('Usuário apagado com sucesso!\n\nClique em [ok] para continuar...');

          // Retorna para a listagem de usuários
          this.navCtrl.navigateForward('usuarios/todos');

          // Se não conseguiu apagar
        } else {

          // Erro
          console.error('falha ao apagar usuário', res.result);

        }
        }

    );

  }
  // Ação do botão listar usuários
  listUsers() {
    this.navCtrl.navigateForward('usuarios/todos');
  }
}


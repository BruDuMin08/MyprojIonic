import { Component, OnInit } from '@angular/core';

// Importa bibliotecas do formulário
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Importa o service da API
import { UsersService } from '../../services/users.service';

// Importa roteamento
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  // Variável que contém o Id do usuário editado
  id = this.route.snapshot.paramMap.get('id');

  // Variável que verifica se não tem usuário a exibir
  noUser = false;

  // Cria formulário
  public userForm: FormGroup;

  constructor(
    // Construtor do ReactiveForms
    private formBuilder: FormBuilder,

    // Inicializa service da API
    private usersService: UsersService,

    // Roteamento
    public navCtrl: NavController,

    // Configura route
    private route: ActivatedRoute
  ) {

    // Definindo campos do formulário
    this.userForm = this.formBuilder.group(
      {
        // Campo 'id'
        id: [null],

        // Campo 'name'
        name: [                   // Nome do campo
          null,                  // Valor inicial
          Validators.compose([   // Regras de validação
            Validators.required, // Campo obrigatório
            Validators.minLength(3), // Comprimento mínimo
          ])
        ],

        // Campo 'email'
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
          ])
        ],

        // Campo 'avatar'
        avatar : [
          null,
          Validators.compose([
            Validators.required,
            // tslint:disable-next-line: max-line-length
            Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
          ])
        ],

        // Campo 'status'
        status: [1]
     });
   }

  ngOnInit() {
    // Se temos um Id na rota...
    if (this.id) {

      // Consulta a API para o Id informado
      this.usersService.getUser(this.id).subscribe(

        // Obtém dados
        (res: any) => {

          // Se o resultado não existe
          if (res.result === 'No record found') {

            // Feedback na página HTML
            this.noUser = true;

            // Sai sem fazer nada
            return false;

        // Se o usuário existe
          } else {


          }
        }
      );
    }
   }

  // Processa formulário enviado
  onSubmit() {
    // console.log(this.userForm.value);

    // Se o campo id esta vazio, estamos cadastrando um usuário
    if (this.userForm.value.id === null) {

      // Cadastra usuário


      // Remove o campo id
      delete this.userForm.value.id;

      // Ajusta o valor do campo 'status' para numérico
      if (!this.userForm.value.status) {
        this.userForm.value.status = 0;
      } else {
        this.userForm.value.status = 1;
      }

      // Salvar dados na API
      this.usersService.postUser(this.userForm.value).subscribe(

        (res: any) => {

          // Se foi adicionado
          if (res.status === 'success') {

            // Feedback
            alert(`"${this.userForm.value.name}" Foi adicionado com sucesso!\nClique em [Ok] para continuar...`);

            // Retorna para a listagem
            this.navCtrl.navigateForward('usuarios/todos');

            // Limpa o formulário
            //this.userForm.reset();

          }

        }
      );


    } else {

      // Editar usuário

    }
  }

    listUsers() {
      this.navCtrl.navigateForward('usuarios/todos');
    }
}

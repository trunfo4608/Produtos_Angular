import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinner } from 'ngx-spinner';
import { ProdutosPostModel } from 'src/app/models/produtos-post.model'; 
import { ProdutosService } from 'src/app/services/produtos.service';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
  
})

export class CadastroProdutosComponent {

  mensagem: string = '';

  constructor(
    private produtosServices: ProdutosService,
    private spinnerService: NgxSpinnerService

    
  ){}

  formCadastro = new FormGroup({

    nome: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),

    descricao: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(200)
    ]),

    preco:new FormControl('',[
      Validators.required,
      Validators.min(0),
      Validators.max(999999)
    ]),

    qtde: new FormControl('',[
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]),


});


get form():any{
  return this.formCadastro.controls;
}

onSubmit():void{

  this.spinnerService.show();

  const model:  ProdutosPostModel = {
    nome: this.formCadastro.value.nome as string,
    descricao: this.formCadastro.value.descricao as string,
    preco: parseFloat(this.formCadastro.value.preco as string),
    qtde: parseInt(this.formCadastro.value.qtde as string)
  };

  this.produtosServices.post(model).subscribe({
    next: (data)=>{
    
      //console.log(data);

      

      this.mensagem =`Produto ${data.nome}, cadastrado com sucesso`;
      this.formCadastro.reset();

      this.spinnerService.hide();
      
    }
  });

}

}
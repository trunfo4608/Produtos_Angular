import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validator, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutosPutModel } from 'src/app/models/produtos-put.model';


@Component({
  selector: 'app-edicao-produtos',
  templateUrl: './edicao-produtos.component.html',
  styleUrls: ['./edicao-produtos.component.css']
})
export class EdicaoProdutosComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private produtosServices: ProdutosService,
    private spinnerServices: NgxSpinnerService,
    private activateRoute: ActivatedRoute

  ){}

  ngOnInit():void{

    const id = parseInt(this.activateRoute.snapshot.paramMap.get('id') as string);

    this.spinnerServices.show();

    console.log(id);

    this.produtosServices.getById(id).subscribe({
      next:(data)=>{
      
        console.log(data);

        this.formEdicao.controls['id'].setValue(data.id.toString());
        this.formEdicao.controls['nome'].setValue(data.nome);
        this.formEdicao.controls['descricao'].setValue(data.descricao);
        this.formEdicao.controls['preco'].setValue(data.preco.toString());
        this.formEdicao.controls['qtde'].setValue(data.qtde.toString());

        this.spinnerServices.hide();
      }
    });
  }
  

  formEdicao = new FormGroup({
    
    id: new FormControl('', []),
    
    nome: new FormControl('', [
      Validators.required, 
      Validators.minLength(8),
      Validators.maxLength(100), 
    ]),
    
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(8), 
      Validators.maxLength(200), 
    ]),
    
    preco: new FormControl('', [
      Validators.required, 
      Validators.min(0),
      Validators.max(999999),
    ]),
    
    qtde: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(9999),
    ]),

});

get form():any{
  return this.formEdicao.controls;
}

onSubmit(): void{
  this.spinnerServices.show();

  const model: ProdutosPutModel={
    id: parseInt(this.formEdicao.value.id as string),
    nome: this.formEdicao.value.nome as string,
    descricao: this.formEdicao.value.nome as string,
    preco: parseFloat(this.formEdicao.value.preco as string),
    qtde: parseInt(this.formEdicao.value.qtde as string)
  };

  this.produtosServices.put(model).subscribe({
    next:(data)=>{
      this.mensagem = `Produto ${data.nome}, atualizado com sucesso.`;
      this.spinnerServices.hide();
    }
  });
}


}

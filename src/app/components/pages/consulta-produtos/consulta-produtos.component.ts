import { Component, OnInit } from '@angular/core';
import { ProdutosGetModel } from 'src/app/models/produtos-get.model';
import { ProdutosService } from 'src/app/services/produtos.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css'],
})
export class ConsultaProdutosComponent implements OnInit {

 produtos: ProdutosGetModel[] = [];
 produto: ProdutosGetModel | null = null;
 mensagem: string ='';
  
 constructor(
  private produtosService: ProdutosService,
  private spinnerService : NgxSpinnerService

 ) {
 }

  
  ngOnInit(): void {

   this.spinnerService.show(); 
   
   this.produtosService.getAll()
    .subscribe({
      next: (data) => {
        
        this.produtos = data;

        this.spinnerService.hide();
      }
    })
  }

  
  onDelete(item: ProdutosGetModel): void{
    this.produto = item;
  }


  onDeleteConfirm():void{
    this.spinnerService.show();
   
    this.produtosService.delete(this.produto?.id as number).subscribe({
        next: (data)=>{
          this.mensagem =`Produto ${data.nome}, excluído com sucesso.`;

          this.spinnerService.hide();

          this.ngOnInit();
        }

    })
  }
 
}

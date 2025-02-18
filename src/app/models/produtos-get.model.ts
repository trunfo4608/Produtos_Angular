/*
    Modelo de dados para a consulta de produtos
*/
export class ProdutosGetModel {
  id: number = 0;
  nome: string = '';
  descricao: string = '';
  preco: number = 0;
  qtde: number = 0;
  total: number = 0;
  dataCriacao: Date | null = null;
  dataUltimaAlteracao: Date | null = null;
}

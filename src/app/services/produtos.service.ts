import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutosGetModel } from '../models/produtos-get.model';
import { environment } from 'src/environments/environment';
import { ProdutosPostModel } from '../models/produtos-post.model';
import { ProdutosPutModel } from '../models/produtos-put.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
 
  resources: string ='/produtos';

  constructor(
    private httpClient: HttpClient
  ) {}

getAll(): Observable<ProdutosGetModel[]> {
    return this.httpClient.get<ProdutosGetModel[]>(
      environment.produtosApi + this.resources
    );
}


post(model: ProdutosPostModel):Observable<ProdutosGetModel>{
  return this.httpClient.post<ProdutosGetModel>(
    environment.produtosApi + this.resources,model
  );
}


put(model: ProdutosPutModel):Observable<ProdutosGetModel>{
  return this.httpClient.put<ProdutosGetModel>(
    environment.produtosApi + this.resources,model
  );
}


delete(id: number):Observable<ProdutosGetModel>{
  return this.httpClient.delete<ProdutosGetModel>(
    environment.produtosApi + this.resources + '/' + id
  );
}

getById(id: number): Observable<ProdutosGetModel> {
  return this.httpClient.get<ProdutosGetModel>(
    environment.produtosApi + this.resources + '/' + id
  );
}


}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { CantinaComponent } from './cantina.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CaixaComponent } from './caixa/caixa.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { FormCadastroProdutoComponent } from './produtos/form-cadastro-produto/form-cadastro-produto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { OrdensComponent } from './ordens/ordens.component';
import { CestaComponent } from './cesta/cesta.component';
import { AbrirFecharCaixaComponent } from './caixa/abrir-fechar-caixa/abrir-fechar-caixa.component';
import { RelatorioCaixasComponent } from './relatorios/relatorio-caixas/relatorio-caixas.component';
import { RelatorioVendasComponent } from './relatorios/relatorio-vendas/relatorio-vendas.component';

const routes: Routes = [
  {path: '', component: CantinaComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'relatorios', component: RelatoriosComponent,
    children: [
      {path: 'caixas', outlet: 'outletRelatorio', component: RelatorioCaixasComponent, pathMatch: 'full' },
      {path: 'historico', outlet: 'outletRelatorio', component: RelatorioCaixasComponent, pathMatch: 'full'},
    ]
  },
  {path: 'caixa', component: CaixaComponent}
];

@NgModule({
  declarations: [
    CantinaComponent,
    ProdutosComponent,
    CaixaComponent,
    RelatoriosComponent,
    FormCadastroProdutoComponent,
    ClientesComponent,
    OrdensComponent,
    CestaComponent,
    AbrirFecharCaixaComponent,
    RelatorioCaixasComponent,
    RelatorioVendasComponent,
    RelatorioVendasComponent
  ],
  entryComponents: [
    ClientesComponent,
    AbrirFecharCaixaComponent,
    OrdensComponent,
    RelatorioVendasComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],

})
export class CantinaModule { }

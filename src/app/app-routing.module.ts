import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./modules/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./modules/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  {
    path: 'factures',
    loadChildren: () => import('./modules/invoices/invoices.module')
      .then(mod => mod.InvoicesModule)
  },
  {
    path: 'ajouter_facture',
    loadChildren: () => import('./modules/add-invoice/add-invoice.module')
    .then(mod => mod.AddInvoiceModule)
  },
  {
    path: 'editer_facture',
    loadChildren: () => import('./modules/edit-invoice/edit-invoice.module')
    .then(mod => mod.EditInvoiceModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  {
    path: 'utilisateurs',
    loadChildren: () => import('./modules/users/users.module')
      .then(mod => mod.UsersModule)
  },
  {
    path: 'ajouter_utilisateur',
    loadChildren: () => import('./modules/add-user/add-user.module')
    .then(mod => mod.AddUserModule)
  },
  {
    path: 'entreprises',
    loadChildren: () => import('./modules/companies/companies.module')
      .then(mod => mod.CompaniesModule)
  },
  {
    path: 'ajouter_entreprise',
    loadChildren: () => import('./modules/add-company/add-company.module')
    .then(mod => mod.AddCompanyModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/not-found.module')
      .then(mod => mod.NotFoundModule)
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

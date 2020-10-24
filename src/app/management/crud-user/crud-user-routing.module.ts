import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { CrudUserCreateComponent } from './crud-user-create/crud-user-create.component';
import { CrudUserDeleteComponent } from './crud-user-delete/crud-user-delete.component';
import { CrudUserEditComponent } from './crud-user-edit/crud-user-edit.component';
import { CrudUserListComponent } from './crud-user-list/crud-user-list.component';
import { CrudUserComponent } from './crud-user.component';

const routes: Routes = [
  {
    path: "",
    component: CrudUserComponent,
    children: [
      {
        path: 'list',
        component: CrudUserListComponent,
      },
      {
        path: 'edit',
        component: CrudUserEditComponent,
      },
      {
        path: 'create',
        component: CrudUserCreateComponent,
      },
      {
        path: 'delete',
        component: CrudUserDeleteComponent,
      },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
      //     .then(m => m.MiscellaneousModule),
      // },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  },
//   { path: "", redirectTo: "post", pathMatch: "full" },
//   { path: "**", redirectTo: "post" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUserRoutingModule { }

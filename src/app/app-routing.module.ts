import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSideComponent } from './components/client-side/client-side.component';
import { AdminSideComponent } from './components/admin-side/admin-side.component';

const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' }, // 默认路由
  { path: 'client', component: ClientSideComponent },
  { path: 'admin', component: AdminSideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

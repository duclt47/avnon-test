import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAnswersComponent } from './form-answers/form-answers.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'form/builder' },
  { path: 'form/builder', component: FormBuilderComponent },
  { path: 'form/answers', component: FormAnswersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

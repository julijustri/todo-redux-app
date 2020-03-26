import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import * as actionsTodos from 'src/app/todos/todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos [] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  todos: Todo [] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.store.select('filtro').subscribe( filtro => {
    //  this.filtroActual = filtro;
    // });
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado ).length;
      this.todos = state.todos;
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    this.filtroActual = filtro;
    this.store.dispatch(actions.setFiltro({filtro: filtro}));

  }

  borrarCompletados() {
   this.store.dispatch(actionsTodos.borrarCompletados());
  }

}

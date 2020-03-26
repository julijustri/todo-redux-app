import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('inputFisico', {static: true}) txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  textInput: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    // console.log(this.todo.completado);
    // this.todo.completado = true;
    this.chkCompletado = new FormControl(this.todo.completado);
    this.textInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe( valor => {
      console.log(valor);
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editar() {
    this.editando = true;
    this.textInput.setValue(this.todo.texto);
    // Esto es un apaño
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {
    this.editando = false;
    if (this.textInput.invalid) { return; }
    if (this.textInput.value === this.todo.texto) { return; }
    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.textInput.value}));
  }

  borrar(){
    // console.log(this.todo.id);
    this.store.dispatch(actions.borrar({id: this.todo.id}));
  }

}

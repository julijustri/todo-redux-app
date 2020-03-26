import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Coser el traje de spiderman'),
  new Todo('Pintar a Hulck')
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo( texto )]),
  on(borrar, (state, {id}) => state.filter( todo => todo.id !== id)),
  on(toggleAll, (state, {completado}) => state.map( todo => {
      return {
        ...todo,
        completado: completado
      };
  })),
  // on(borrarCompletados, (state) => state.filter( todo => todo.completado !== true)),
  on(borrarCompletados, (state) => state.filter( todo => !todo.completado)),
  on(toggle, (state, {id}) => {
      return state.map( todo => {
        if ( todo.id === id) {
          return {
            ...todo,
            completado: !todo.completado
          };
        } else {
          return todo;
        }
      });
  }),
  on(editar, (state, {id, texto}) => {
    return state.map( todo => {
      if ( todo.id === id) {
        return {
          ...todo,
          texto: texto
        };
      } else {
        return todo;
      }
    });
})
);
// Pueden revisar el map en:
// El map crea un nuevo array No muta el objeto, esto es super importante
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

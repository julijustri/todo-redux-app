import { createAction, props } from '@ngrx/store';

export const borrarCompletados = createAction(
  '[TODO] borrarCompletados Todo'
  );

export const crear = createAction(
  '[TODO] Crea Todo',
  props<{ texto: string}>()
  );

export const toggle = createAction(
    '[TODO] Toogle Todo',
    props<{ id: number }>()
    );

export const editar = createAction(
    '[TODO] Editar Todo',
      props<{ id: number, texto: string }>()
    );

export const borrar = createAction(
    '[TODO] Borrar Todo',
     props<{ id: number }>()
    );

export const toggleAll = createAction(
    '[TODO] ToggleAll Todo',
     props<{ completado: boolean }>()
    );


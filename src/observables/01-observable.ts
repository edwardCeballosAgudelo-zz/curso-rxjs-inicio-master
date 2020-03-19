import { Observable, Observer } from 'rxjs'

const observer: Observer <any> = {
  next: value => console.log('siguiente [next]:', value),
  error: error => console.warn('error [obs]:', error),
  complete: () => console.info('completado [obs]')
}

// const obs$ = Observable.create();
const obs$ = new Observable(subs => {
  subs.next('Hola')
  subs.next('Mundo')

  // forzar un error
  /* const a = undefined;
  a.nombre = 'edward'; */

  subs.complete();
});

obs$.subscribe( observer )

/* obs$.subscribe(
  valor => console.log('next: ', valor),
  error => console.warn('error: ', error),
  () => console.info('completado')
); */
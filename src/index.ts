import { Observable, Observer, Subscriber } from 'rxjs'

const observer: Observer <any> = {
  next: value => console.log('[next]:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('completado')
}

const intervalo$ = new Observable <number>( subscriber => {
  // crear un contador
  let contador = 0;
  let interval = setInterval(() => {
    // cada segundo
    contador++;
    subscriber.next( contador )
  }, 1000);
  return () => {
    clearInterval(interval);
    console.log('interval destruido');
  }
});

const subscription1 = intervalo$.subscribe( num => console.log('Num:', num ));
const subscription2 = intervalo$.subscribe( num => console.log('Num:', num ));
const subscription3 = intervalo$.subscribe( num => console.log('Num:', num ));

setTimeout(() => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
  subscription3.unsubscribe();

  console.log('Completado Intervalo');
}, 3000);
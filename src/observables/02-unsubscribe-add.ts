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
    subscriber.next( contador );
    console.log( contador );
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
    console.log('interval destruido');
  }
});

const subscription1 = intervalo$.subscribe( observer );
const subscription2 = intervalo$.subscribe( observer );
const subscription3 = intervalo$.subscribe( observer );

subscription1.add( subscription2 ).add( subscription3 );

setTimeout(() => {
  subscription1.unsubscribe();
  // subscription2.unsubscribe();
  // subscription3.unsubscribe();

  console.log('Completado Intervalo');
}, 3000);
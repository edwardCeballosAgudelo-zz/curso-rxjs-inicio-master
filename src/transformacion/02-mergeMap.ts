import { of, interval, fromEvent } from "rxjs";
import { mergeMap, map, take, takeUntil } from "rxjs/operators";

const letras$ = of('a', 'b', 'c');

letras$.pipe(
  mergeMap( (letra) => interval(100).pipe(
    map(i => letra+ i),
    take(3)
  ))
)/* .subscribe({
  next:val => console.log('next', val),
  complete: () => console.log('completado')
}); */

const mouseDown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const inteval$ = interval();

mouseDown$.pipe(
  mergeMap( () => inteval$.pipe(
    takeUntil( mouseup$ )
  ))
).subscribe( console.log );
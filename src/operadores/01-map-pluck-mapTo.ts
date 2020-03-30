import { range, fromEvent } from "rxjs";
import { map, pluck, mapTo } from "rxjs/operators";

/* range(1, 5).pipe(
  map<number, number>( val => val *10 )
).subscribe( console.log ); */

const KeyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupCode$ = KeyUp$.pipe(
  map( event => event.code )
);

const keyupPluck$ = KeyUp$.pipe(
  pluck('target', 'baseURI')
);

const keyupMapTo$ = KeyUp$.pipe(
  mapTo('Tecla Presionada')
);

KeyUp$.subscribe( console.log );
keyupCode$.subscribe( code => console.log('map', code) );
keyupPluck$.subscribe( code => console.log('pluck', code) );
keyupMapTo$.subscribe( code => console.log('mapTo', code) );


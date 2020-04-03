import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

const texto = document.createElement('div');
texto.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt eleifend erat non consequat. Maecenas vel erat id massa pulvinar tristique. Morbi hendrerit nisl vitae eros blandit pretium. Ut venenatis dapibus enim. Sed vulputate sem vitae varius sagittis. Fusce mollis, erat nec laoreet porta, orci tellus auctor mauris, ac rutrum libero libero nec nisl. Vivamus egestas accumsan sem sit amet sollicitudin. Pellentesque facilisis justo vitae urna feugiat, tincidunt blandit ligula ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed luctus ligula nibh, ac laoreet turpis convallis lacinia. Vivamus condimentum elit dui, interdum dapibus urna finibus nec. Cras vitae porttitor tortor. Sed eu hendrerit diam.
<br/><br/>
Cras maximus porttitor consectetur. Vestibulum ullamcorper tellus non nunc rutrum blandit. Curabitur congue, nulla quis gravida rutrum, sapien velit blandit lorem, a suscipit justo orci sit amet est. Phasellus placerat pellentesque nulla vitae blandit. Etiam porttitor leo in eleifend commodo. Curabitur at libero iaculis, egestas neque ultricies, feugiat dolor. Nulla egestas justo eu sem rhoncus sollicitudin. Fusce hendrerit orci in tortor sollicitudin laoreet non id sapien. Aenean sed ipsum quis diam congue congue vel id diam. In ornare sagittis erat. Aliquam placerat placerat urna, eu mattis odio egestas et. Proin laoreet molestie purus, at accumsan leo viverra quis.
<br/><br/>
Fusce semper, dui luctus porta tincidunt, urna mauris varius ipsum, non suscipit justo orci ut neque. Donec tempus sem in ligula malesuada malesuada. Nam in imperdiet mi. Pellentesque sit amet condimentum urna, vitae rutrum arcu. Sed commodo nulla finibus, ornare elit sit amet, faucibus augue. Praesent at mauris suscipit tellus mollis faucibus. Fusce ac pretium eros. Sed dictum, ante convallis dapibus dignissim, elit urna posuere quam, semper ornare leo lacus at metus. Sed laoreet ornare leo non pharetra. Donec volutpat tincidunt enim, hendrerit dignissim leo condimentum quis. Proin eu diam ultricies, volutpat libero at, congue neque. Proin maximus, ipsum id porta aliquam, urna diam sagittis lacus, vitae bibendum sapien dui vel turpis.
<br/><br/>
In eget elementum nulla. Fusce accumsan facilisis odio, vel sodales felis facilisis ut. Sed facilisis auctor pharetra. Praesent ipsum tellus, sodales eget aliquet in, ultrices non velit. Suspendisse fringilla urna nisl, quis pulvinar arcu egestas sit amet. Phasellus aliquam auctor pellentesque. Sed ut purus sed augue mattis ornare. Morbi pellentesque porta rutrum. Phasellus sit amet ornare metus. Etiam tempor varius tempor. Nullam bibendum mauris neque, a condimentum tortor elementum sit amet. Donec vel sodales justo, quis eleifend tellus. Aenean nec faucibus erat. Ut bibendum augue in justo placerat, quis ultrices sem vulputate.
<br/><br/>
Nunc porttitor lobortis luctus. Curabitur id neque tristique magna ultricies posuere nec feugiat lacus. Nam at diam eget quam pulvinar auctor. Sed ac velit sit amet leo tempus tincidunt. Nunc pharetra eros sodales cursus porttitor. Nulla semper egestas massa in pulvinar. Donec purus lectus, placerat ut diam tincidunt, convallis cursus neque. Donec nisl odio, efficitur non suscipit aliquam, aliquam vel orci.`;

const body = document.querySelector('body')
body.append( texto );

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append( progressBar );

// funcion que haga el calculo
const calcularPorcentajeScroll = ( event ) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
  return (scrollTop / (scrollHeight - clientHeight ) ) * 100;
}

// Streams
const scroll$ = fromEvent(document, 'scroll');
/* scroll$.subscribe( console.log ); */

const progress$ = scroll$.pipe(
  // map( event => calcularPorcentajeScroll(event) )
  map( calcularPorcentajeScroll ),
  tap( console.log )
);

progress$.subscribe( porcentaje => {
  progressBar.style.width = `${porcentaje}%`;
});
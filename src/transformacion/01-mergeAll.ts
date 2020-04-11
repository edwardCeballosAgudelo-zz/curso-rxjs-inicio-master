import { fromEvent, Observable } from "rxjs";
import { debounceTime, map, pluck, mergeAll } from "rxjs/operators";

import { ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-user.interfaces";
import { GithubUsersResp } from "../interfaces/github-users.interfaces";

// referencias
const body =  document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append( textInput, orderList );

//helpers
const mostrarUsuarios = ( usuarios: GithubUser[] ) => {
  console.log(usuarios);
  orderList.innerHTML = '';

  for (const usuario of usuarios) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = usuario.avatar_url;

    const anchor = document.createElement('a');
    anchor.href = usuario.html_url;
    anchor.text = 'Ver página';
    anchor.target = '_blanck';

    li.append( img );
    li.append( usuario.login + ' ');
    li.append( anchor );

    orderList.append( li );
  }
}

// streams
const input$ = fromEvent<KeyboardEvent>(document, 'keyup');

input$.pipe(
  debounceTime<KeyboardEvent>(500),
  pluck<KeyboardEvent, string>('targer', 'value'),
  map<string, Observable<GithubUsersResp>>( texto => ajax.getJSON(`https://api.github.com/search/users?q=${ texto }`)),
  mergeAll<GithubUsersResp>(),
  pluck<GithubUsersResp, GithubUser[]>('items')
).subscribe( mostrarUsuarios );
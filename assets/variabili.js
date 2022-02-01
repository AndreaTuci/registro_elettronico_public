let base64 = require('base-64');

let old = 'http://192.168.1.9:19000/anagrafica/api/studenti/202/'
export let student_detail_url = 'https://gestionalecfp.herokuapp.com/anagrafica/api/studenti/93/';
export let test_url = 'http://127.0.0.1:8000/anagrafica/api/studenti/'
export let notes_detail_url = 'https://gestionalecfp.herokuapp.com/anagrafica/api/studenti/note/93/';
export let base_url_X = 'http://127.0.0.1:8000/anagrafica/api/studenti/'
export let base_url = 'https://gestionalecfp.herokuapp.com/anagrafica/api/studenti/'

let username = 'Test';
let password = 'test2021';

let headers = new Headers();
let tokenHeaders = new Headers();

tokenHeaders.set('Authorization', 'Token e1c6f36ddedb143e223c6403da033c98a15885e4')

headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
export {headers, tokenHeaders}

import { page } from '../src/lib.js';
import { catalogPage } from './views/catalog.js';
import { homePage } from './views/home.js';

page(`/`, homePage());
page(`/catalog`, catalogPage); 

page.start();
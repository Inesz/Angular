import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppComponent }     from './app.component';

import { HTTP_PROVIDERS }    from '@angular/http';
import { Type } from '@angular/core';

bootstrap(<Type>AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS
]);

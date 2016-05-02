import {bootstrap} from 'angular2/platform/browser';
import {Component, enableProdMode, OnInit} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';

@Component({
    selector: 'app',
    template: `hello
  `,
})
class App implements OnInit {
    constructor() {}
}

// enableProdMode();
bootstrap(App)
    .catch(err => console.error(err));
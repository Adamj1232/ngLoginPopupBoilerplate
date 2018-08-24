# Boilerplate Login Ui

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0. It is now using angular-cli v1.4.9
Angular 5 and then some...
## Getting Started

### Tools
1. Install [Node.js](http://nodejs.org/en/) v9.0. or higher
2. Install [npm](https://npmjs.com) v5 or higher
3. Install [Angular CLI](https://cli.angular.io/) v1.4.9
4. Install [http-server](https://www.npmjs.com/package/http-server)
5. Install [Atom IDE](https://atom.io/)
  - Install the atom-typescript plugin
  - Install the linter-tslint plugin
  - Also recommended: git-time-machine
  - Also recommended: project-manager

### Installing dependencies
run `npm install`

### Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you need to work on the landing page, run `http-server` in the `landing` directory and navigate to `http://localhost:8080`. This page will **not** automatically reload!

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build
See Deployment section below

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deployment
The package.json version and docker image versions are linked. If you build and push with out updating the package.json version, you will overwrite the previous image. It is recommended to use the `npm version` command, as it will also tag the commit in git so everybody points to the same version.

### Prerequisites
1. Docker
2. Access to the NaaS Docker Registry
3. All changes have been committed and pushed upstream (e.g. a clean git repo)
4. All submodule changes have been committed and pushed upstream as well
4. `ng build --prod` works

### Pushing to the docker registry
- Do `ng build --prod` if there is any question that the build will fail. This will prevent unnecessary version bumps.

```
$ npm version <new-version>
$ git push --follow-tags
$ ./docker-build.sh
$ ./docker-push.sh
```

### Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Contents
- [Assumptions](#assumptions)
- [FormsControlModule](#formcontrolsmodule)
- [LayoutModule](#layoutmodule)
  - [LayoutComponent](#layoutcomponent)
  - [ModalComponent](#modalcomponent)
  - [NavigationComponent](#navigationcomponent)
  - [PlaceholderComponent](#placeholdercomponent)
- [LoginComponent](#logincomponent)
- [Services](#services)
  - [AdminActivationGuard](#adminactivationguard)
  - [AuthActivationGuard](#authactivationguard)
  - [AuthService](#authservice)
  - [DataService](#dataservice)

## Assumptions
There are several assumptions that have been made as to the layout of the parent
project and some basic API hooks.

#### Parent Project
- Angular 5
- Created with [Angular CLI](cli.angular.io)
- Routing table
- All services that communicate with the API shall `extend DataService`


#### Routing Table
The following routing table works. Be sure to put any additional paths as
children of the `LayoutComponent`, and add the `canActivate` guard to push
unauthorized users to the login page - not hooked up for modal use yet.

app.routing.ts
```javascript
import { AuthActivationGuard } from '../common/services/auth-activation.guard';
import { LayoutComponent } from '../common/layout/layout.component';
import { LoginComponent } from '../common/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'dashboard', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }, {
            // defaults to dashboard
            path: '**', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }]
    }
];
```

## Changing the API URL
The API base URL is defined as `apiRoot` in the environment files of the parent
project, see `src/environments/`

## FormControlsModule
This module creates form controls from JSON

### Usage
TODO -- put the various form controls here

#### Validators
[Supported  validators](https://angular.io/docs/ts/latest/api/forms/index/Validators-class.html): supply the function name as `type`, the args (if any) to `args`, and a meaningful message to `msg`

```javascript
validations: [{
    type: 'required',
    msg: 'This is required, silly'
}]
```

Custom validators are on their way (eg IP address)

### Adding a new control

1) Add appropriate HTML to `dynamic-form-question.component.html` wrapped in a `ngSwitchCase` div

```html
<div *ngSwitchCase="'datepicker'">
  <label [attr.for]="question.key">
    {{question.label}}
  </label>
  <my-date-picker [options]="question.options" [id]="question.key"
                  [attr.name]="question.key" [formControlName]="question.key">
  </my-date-picker>
</div>
```

2) Create the model class with filename `question-<control name>.ts`, and define the `controlType` attribute.

```javascript
import { IMyOptions } from 'mydatepicker';
import {QuestionBase, IOption} from './question-base';

export class DatepickerQuestion extends QuestionBase<boolean> {
    controlType = 'datepicker';
    options: IMyOptions;

    constructor(options:IOption<any> = {}) {
        super(options);
        this.options = options.options;
    }
}
```

3) TODO: add to factory

### References
- [Offical Angular Guide](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html)
- [Implementation](http://ng-course.org/ng-course/demos/ng-course/index.html#12-FormBuilder)
- [Walk thru](http://www.syntaxsuccess.com/viewarticle/dynamic-form-in-angular-2.0)

Form states derived from:
- https://github.com/angular/angular/blob/master/modules/@angular/forms/src/model.ts
- https://angular.io/docs/ts/latest/api/forms/index/AbstractControl-class.html#!#status-anchor

## LayoutModule
This module contains the basic building blocks of the portal layout. The parent
app's routing table must be configured properly. See [assumptions](#assumptions)

### LayoutComponent
This component will generate the top banner and left navigation. Requires a
properly configured routing table on the parent app.

#### Usage
As the [login modal](#logincomponent) has no need for a layout, the routes tree
has a distinct fork at the top -- login on one side, the rest of the app on the
other. The `LayoutComponent` has a `router-outlet`, which allows the router to
be able to inject child components into the view. This is preferable to wrapping
each page with a `<cmn-layout>PAGE CONTENT</cmn-layout>`, but means that the
routing table must be configured as follows.

app.routing.ts
```javascript
import { AuthActivationGuard } from '../common/services/auth-activation.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from '../common/layout/layout.component';
import { LoginComponent } from '../common/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'dashboard', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }, {
            // defaults to dashboard
            path: '**', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }]
    }
];
```

The `fill-view` css class will fill the view with the content.

### NavigationComponent
This component is responible for generating and rendering the navigation on the
left side of the app. This component is not exposed outside of `LayoutModule`,
and it relies on the `NavigationService` to get the navigable list items from
the api. See [assumptions](#assumptions) for the api path

### PlaceholderComponent
This nifty component creates angular `Components` on the fly! Got `@Input`s? No
problem!

#### Usage
The component that is going to be dynamically created **MUST** be declared in
the `entryComponents` array in the appropriate module file! Otherwise a similar
error to the following will appear in the console:
>No component factory found for StepComponent. Did you add it to
@NgModule.entryComponents?

\*.module.ts
```javascript
@NgModule({
  entryComponents: [StepComponent], // your component here
  declarations: [StepComponent] // like usual
  ...
})
```

some.component.ts
```javascript
import { Placeholder, PlaceholderComponent } from 'common/placeholder';

import { StepComponent } // your component here

@Component({
  template: '<cmn-placeholder [componentData]="placeholder"></cmn-placeholder>'
})
export class SomeComponent {
  placeholder: Placeholder = {
    component: StepComponent,
    // inputs are key/value pairs based on the @Input(s) of the component
    inputs: { step: 1 }
  };
}
```

### Notes
Any key/value pair in the inputs object will cause `SomeComponent[key] = value`
to be executed. Technically, these pairs don't have to be called out as
`@Input`s.

### References
- [Official Angular Guide](https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html)
- [Old Implementation](http://blog.rangle.io/dynamically-creating-components-with-angular-2/)
- [Variation](https://medium.com/@tudorgergely/injecting-components-dynamically-in-angular-2-3d36594d49a0#.eiu11ov8z)

## LoginComponent
This component provides a full screen login page. Requires a properly configured
routing table. See [assumptions](#assumptions)

### Usage
Put the LoginComponent as the first item in the routing table, as it doesn't
need to have the [layout](#layoutmodule) applied to it.

app.routing.ts
```javascript
import { AuthActivationGuard } from '../common/services/auth-activation.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from '../common/layout/layout.component';
import { LoginComponent } from '../common/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'dashboard', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }, {
            // defaults to dashboard
            path: '**', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }]
    }
];
```

## ServiceModule
These are the common services!

### AuthActivationGuard
This service prevents unauthorized access to the app. This guard is meant to be
used in the routing table. If a the user is not authorized (eg, timeout occured)
then this guard will navigate the user to the [login](#logincomponent) page.

#### Usage
Used in the `canActivate` property of each route.

app.routing.ts
```javascript
import { AuthActivationGuard } from '../common/services/auth-activation.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from '../common/layout/layout.component';
import { LoginComponent } from '../common/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'dashboard', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }, {
            // defaults to dashboard
            path: '**', canActivate: [ AuthActivationGuard ],
            component: DashboardComponent
        }]
    }
];
```

### AuthService
Manages log in/out requests and provides authorization state.

#### Usage
```javascript
login(username: string, password: string): Observable<boolean>

logout(): Observable<boolean>

isLoggedIn(): Observable<boolean>

getMe(): Observable<any>
```

### DataService
The parent of **every** service that communicates with the back end. Provides
all the REST verbs, and error catching.

TODO: caching

#### Usage
```javascript
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../../common/services/data.service';

@Injectable()
export class DeviceService extends DataService {
    private path: string = '/catalogs/devices/';

    public getDevices(): Observable<any> {
        return super.get(this.path);

    }
}
```

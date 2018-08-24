// http://stackoverflow.com/questions/33970645/how-to-extend-a-component-with-dependency-injection-in-angular-2
import { Injector } from '@angular/core';

export class ServiceLocator {
    static injector: Injector;
}

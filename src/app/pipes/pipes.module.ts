import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalizePipe } from './capitalize.pipe';
import { EllipsisizePipe } from './ellipsisize.pipe';

@NgModule({
    declarations: [
        CapitalizePipe,
        EllipsisizePipe
    ],
    exports: [
        CapitalizePipe,
        EllipsisizePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}

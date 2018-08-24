import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";

@Pipe({name: 'ellipsisize'})
export class EllipsisizePipe implements PipeTransform {
    transform(value:any, desiredLengthIncludingElip: number) {
        if (value && value.length > desiredLengthIncludingElip) {
            //TODO: need to make this clickable to show the whole string or something
            return value.substring(0, desiredLengthIncludingElip - 3) + "...";
        }
        return value;
    }
}

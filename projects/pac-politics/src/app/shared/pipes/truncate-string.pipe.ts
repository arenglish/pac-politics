import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncateString"
})
export class TruncateStringPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const truncateEnd = args.length > 1 ? args[1] : true;
    const trail = args.length > 2 ? args[2] : "...";

    if (value.length > limit) {
      return truncateEnd
        ? value.substring(0, limit) + trail
        : trail + value.substring(value.length - limit, value.length);
    } else {
      return value;
    }
  }
}

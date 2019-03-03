import { Transform } from 'class-transformer';

export class Bill {
    id: string;

    url: string;

    set billUri(val) {
        this.url = val;
    }

    set apiUri(val) {
        this.url = val;
    }

    number: string;

    shortTitle: string;
    title: string;
}
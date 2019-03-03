import { Transform } from 'class-transformer';

export class Pac {
    id: string;

    set committeeId(id) {
        this.id = id;
    }

    name: string;
    acronym: string;
    disembursements: any[];
}
import { User } from "../users/user";

export class Invoice
{
    constructor(
        public id: number,
        public name: string,
        public id_customer: number,
        public id_vendor: number,
        public id_author: number,
        public id_state: number,
        public vat_rate: number,
        public total_duty_free: number,
        public createdAt: Date,
        public updatedAt: Date,
        public image: string,
        public user: User,
        public comment?:string
    ) {

    }


}
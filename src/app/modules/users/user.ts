export class User {
    constructor(
        public id: number,
        public email: string,
        public token: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public id_role: number,
        public civ: number,
        public createdAt: Date,
        public inactivAt: Date
    ) { }
}
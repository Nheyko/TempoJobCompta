import { CompanyCountry } from '../companies/company-country'
import { CompanyLegalStatus } from './company-legal-status';

export class Company
{
    constructor(
        public id: number,
        public name: string,
        public adress: string,
        public city: string,
        public zipcode: string,
        public id_country: number,
        public is_customer: number,
        public createdAt: Date,
        public country: CompanyCountry,
        public legal_statute: CompanyLegalStatus,
        public siren_number?: string,
        public other?: string,
        public id_legal_status?: number,
        public vat_number?: string,
        public phone_number?: string,
    ) {}
}
import { IsCustomerPipe } from './is-customer.pipe';

describe('IsCustomerPipe', () => {
  it('create an instance', () => {
    const pipe = new IsCustomerPipe();
    expect(pipe).toBeTruthy();
  });
});

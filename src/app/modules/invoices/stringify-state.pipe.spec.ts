import { StringifyStatePipe } from './stringify-state.pipe';

describe('StringifyStatePipe', () => {
  it('create an instance', () => {
    const pipe = new StringifyStatePipe();
    expect(pipe).toBeTruthy();
  });
});

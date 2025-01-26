import { test, expectTypeOf } from 'vitest';
import { Select } from './select';
test('Styled Select Types', () => {
  <Select.Root
    onChange$={(value) => {
      expectTypeOf(value).toMatchTypeOf<string>();
    }}
  />;

  <Select.Root
    multiple
    onChange$={(value) => {
      expectTypeOf(value).toMatchTypeOf<string[]>();
    }}
  />;
});

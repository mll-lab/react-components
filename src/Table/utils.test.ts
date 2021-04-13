import { labeledEnumToColumnFilterItem } from './utils';

enum Foo {
  BAR = 'baz',
}

const LabeledFoo = {
  [Foo.BAR]: 'foobar',
};

describe('labeledEnumToColumnFilterItem', () => {
  it('converts an enum', () => {
    expect(labeledEnumToColumnFilterItem(LabeledFoo)).toEqual([
      {
        text: 'foobar',
        value: 'baz',
      },
    ]);
  });
});

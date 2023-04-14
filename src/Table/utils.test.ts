import { mapToColumnFilterItems, objectToColumnFilterItems } from './utils';

enum Foo {
  BAR = 'baz',
}

const FOO_LABELS = {
  [Foo.BAR]: 'foobar',
};

describe('objectToColumnFilterItems', () => {
  it('converts a labeled enum', () => {
    expect(objectToColumnFilterItems(FOO_LABELS)).toEqual([
      {
        text: 'foobar',
        value: 'baz',
      },
    ]);
  });
});

describe('mapToColumnFilterItem', () => {
  it('converts a map with boolean keys', () => {
    expect(
      mapToColumnFilterItems(
        new Map([
          [true, 'Yes'],
          [false, 'No'],
        ]),
      ),
    ).toEqual([
      {
        value: true,
        text: 'Yes',
      },
      {
        value: false,
        text: 'No',
      },
    ]);
  });
});

import { Story } from '@storybook/react';
import React from 'react';

import { THEME } from '../theme';

import { Card, CardProps } from './index';

export default {
  title: 'Card',
};

export const Default: Story<CardProps> = function Default(args) {
  return (
    <Card title="Default size card" {...args}>
      <p>Card content</p>
    </Card>
  );
};

export const InnerCard: Story<CardProps> = function InnerCard(args) {
  return (
    <Card type="inner" title="Inner Card title" extra="Extra content" {...args}>
      Inner Card content
    </Card>
  );
};

export const TabsCard: Story<CardProps> = function TabsCard(args) {
  return (
    <Card
      title="Card with Tabs"
      extra="Extra"
      tabList={[
        {
          key: 'tab1',
          tab: 'tab1',
        },
        {
          key: 'tab2',
          tab: 'tab2',
        },
      ]}
      {...args}
    >
      some content
    </Card>
  );
};

const gridStyle = {
  width: '25%',
};

export const CardsGrid: Story<CardProps> = function CardsGrid(args) {
  return (
    <Card title="Cards Grid" {...args} style={{ width: 400 }}>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  );
};

export const CardMeta: Story<CardProps> = function CardMeta(args) {
  return (
    <Card hoverable style={{ width: 240 }} cover="Some cover" {...args}>
      <Card.Meta title="Europe Street beat" description="www.google.com" />
    </Card>
  );
};

export const CardOnColoredBackground: Story<CardProps> =
  function CardOnColoredBackground(args) {
    return (
      <div style={{ background: THEME.backgroundColor, padding: 20 }}>
        <Card
          style={{ width: 240 }}
          title="Card on background with default color"
          {...args}
        >
          <p>Border is visible even when there is a background color</p>
        </Card>
      </div>
    );
  };

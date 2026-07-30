import React from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Typography } from '../Typography';

import { MasterMixTable } from './MasterMixTable';
import { ReactionTable } from './ReactionTable';
import { MasterMixProps } from './types';

export { reactionVolume } from './reactionVolume';
export {
  MasterMixProps,
  MasterMixIngredient,
  PipettingLoss,
  PipettingLossAbsolute,
  PipettingLossByFactor,
  PipettingLossFactorWithMinimum,
} from './types';

const NestedMasterMixCard = styled(Card)`
  max-width: 400px;
  margin-bottom: 8px;
`;

/**
 * Shows what to pipette for a given number of reactions.
 * Ingredients added per reaction turn the master mix into a part of the reaction mix.
 */
export function MasterMix({
  name,
  ingredients,
  perReactionIngredients,
  ...columnArgs
}: MasterMixProps) {
  const masterMixTable = (
    <MasterMixTable ingredients={ingredients} {...columnArgs} />
  );

  return (
    <Card
      title={
        <Typography.Title level={5}>
          {name} {perReactionIngredients?.length ? 'Reaktionsmix' : 'MasterMix'}
        </Typography.Title>
      }
    >
      {perReactionIngredients?.length ? (
        <>
          <NestedMasterMixCard
            title="MasterMix"
            size="small"
            bodyStyle={{ padding: 0 }}
          >
            {masterMixTable}
          </NestedMasterMixCard>
          <ReactionTable
            masterMixIngredients={ingredients}
            perReactionIngredients={perReactionIngredients}
            {...columnArgs}
          />
        </>
      ) : (
        masterMixTable
      )}
    </Card>
  );
}

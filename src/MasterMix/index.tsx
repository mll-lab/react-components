import React from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Typography } from '../Typography';

import { MixTable } from './MixTable';
import { MASTER_MIX_LABEL } from './mixRows';
import { MasterMixProps } from './types';

export { reactionVolume } from './reactionVolume';
export {
  MasterMixProps,
  MasterMixIngredient,
  ReactionMix,
  PipettingScaling,
  RecipeMode,
  PipettingLoss,
  PipettingLossAbsolute,
  PipettingLossByFactor,
  PipettingLossFactorWithMinimum,
} from './types';

const MixContent = styled.div`
  max-width: 400px;
`;

/**
 * Shows what to pipette for a given number of reactions, or as a plain recipe in `mode="recipe"`.
 * Ingredients added per reaction turn the master mix into a part of the reaction mix.
 */
export function MasterMix({
  name,
  mode,
  count,
  pipettingLoss,
  ingredients,
  perReactionIngredients,
}: MasterMixProps) {
  const scaling =
    mode === 'recipe' ? undefined : { count, pipettingLoss, mode };

  return (
    <Card
      title={
        <Typography.Title level={5}>
          {name}{' '}
          {perReactionIngredients?.length ? 'Reaktionsmix' : MASTER_MIX_LABEL}
        </Typography.Title>
      }
    >
      <MixContent>
        <MixTable
          ingredients={ingredients}
          perReactionIngredients={perReactionIngredients}
          scaling={scaling}
        />
      </MixContent>
    </Card>
  );
}

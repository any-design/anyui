import type { APopperTriggerType } from '../popper/types';

export type ATooltipTriggerType = Extract<APopperTriggerType, 'hover' | 'click'>;

import { Placement } from '@popperjs/core';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import offsetMod from '@popperjs/core/lib/modifiers/offset';
import flipMod from '@popperjs/core/lib/modifiers/flip';

const createPopperInstance = ({
  trigger,
  popup,
  placement,
  offset,
}: {
  trigger: HTMLElement;
  popup: HTMLElement;
  placement: Placement;
  offset: number;
}) => {
  return createPopper(trigger, popup, {
    placement: placement,
    modifiers: [
      {
        ...preventOverflow,
        options: {
          padding: 12,
        },
      },
      {
        ...flipMod,
        options: {
          padding: 12,
        },
      },
      {
        ...offsetMod,
        options: {
          offset: [0, offset],
        },
      },
    ],
  });
};

export { createPopperInstance };

import type { Placement } from '@popperjs/core';
import flipMod from '@popperjs/core/lib/modifiers/flip';
import offsetMod from '@popperjs/core/lib/modifiers/offset';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import { createPopper } from '@popperjs/core/lib/popper-lite';

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
  const popper = createPopper(trigger, popup, {
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

  popper.update();

  return popper;
};

export { createPopperInstance };

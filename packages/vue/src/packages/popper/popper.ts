import {
  createPopperLite,
  flip as flipMod,
  offset as offsetMod,
  preventOverflow,
  type Placement,
} from '@popperjs/core';

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
  const popper = createPopperLite(trigger, popup, {
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

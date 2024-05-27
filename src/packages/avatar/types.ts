import type { EnumValues } from '@/utils/types';

export enum AvatarSize {
  XLarge = 'xlarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

export const PREDEFINED_SIZE: Record<EnumValues<typeof AvatarSize>, number> = {
  [AvatarSize.XLarge]: 64,
  [AvatarSize.Large]: 48,
  [AvatarSize.Medium]: 32,
  [AvatarSize.Small]: 24,
  [AvatarSize.XSmall]: 16,
};

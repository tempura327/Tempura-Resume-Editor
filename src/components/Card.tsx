import { FC, PropsWithChildren, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { tlsx } from '@/utils/index';

const card = tv({
  base: 'card overflow-hidden size-fit',
  variants: {
    variant: {
      outlined: 'card-border border-base-300',
      contained: 'bg-base-300',
    },
    direction: {
      vertical: '',
      horizontal: 'card-side',
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
});

interface CardProps {
  variant?: 'outlined' | 'contained';
  direction?: 'vertical' | 'horizontal';
  isShadow?: boolean;
  classes?: {
    container?: string;
    body?: string;
  };
  sideElemnet?: ReactNode;
  actionButton?: ReactNode;
}

const Card: FC<PropsWithChildren<CardProps>> = ({
  variant,
  direction,
  isShadow,
  classes,
  sideElemnet,
  actionButton,
  children,
  ...rest
}) => {
  return (
    <div
      className={tlsx(card({ variant, direction }), classes?.container || '', {
        'shadow-sm': !!isShadow,
      })}
      {...rest}
    >
      {sideElemnet}

      <div className={tlsx('card-body', classes?.body || '')}>
        {children}
        {actionButton && (
          <div className="card-actions justify-end">{actionButton}</div>
        )}
      </div>
    </div>
  );
};

export default Card;

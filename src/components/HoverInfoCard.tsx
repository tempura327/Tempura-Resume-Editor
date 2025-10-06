import { FC, PropsWithChildren, ReactNode } from 'react';

import Card from '@/components/Card';

interface HoveredInfoCardProps {
  hoveredElement: ReactNode;
}

const HoveredInfoCard: FC<PropsWithChildren<HoveredInfoCardProps>> = ({
  hoveredElement,
  children,
}) => {
  return (
    <Card
      classes={{
        container: 'group',
        body: 'p-0 relative',
      }}
    >
      <div className="transition-all group-hover:brightness-20">{children}</div>

      <div className="absolute top-0 text-white p-8 invisible group-hover:visible">
        {hoveredElement}
      </div>
    </Card>
  );
};

export default HoveredInfoCard;

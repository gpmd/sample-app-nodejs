import { Panel, Link as StyledLink, Table } from '@bigcommerce/big-design';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useWidgetList } from '../../lib/hooks';
import { WidgetsTableItem } from '../../types';

const Widgets = () => {
  const { list = [], meta = {} } = useWidgetList();
  const tableItems: WidgetsTableItem[] = list.map(({ uuid, name }) => ({
      uuid,
      name,
  }));

  const renderName = (uuid: number, name: string): ReactElement => (
      <Link href={`/widgets/${uuid}`}>
          <StyledLink>{name}</StyledLink>
      </Link>
  );

  return (
      <Panel>
          <Table
              columns={[
                  { header: 'Widget name', hash: 'name', render: ({ uuid, name }) => renderName(uuid, name) },
              ]}
              items={tableItems}
              itemName="Widgets"
              stickyHeader
          />
      </Panel>
  );
};

export default Widgets;

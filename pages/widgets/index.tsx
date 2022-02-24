import { Button, Dropdown, Panel, Small, StatefulTable, Link as StyledLink } from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import { useWidgetList } from '../../lib/hooks';

const Widgets = () => {
  const router = useRouter();
  // Retrieve data from the catalog/products endpoint
  const { isError, isLoading, list = [] } = useWidgetList();
  // Properly format data for BigDesign's StatefulTable
  const tableItems = list.map(({ uuid, name }) => ({
      uuid,
      name,
  }));
  // When rendering table headers, you can return a string or a React component:
  const renderName = (uuid: number, name: string): ReactElement => (
      <Link href={`/widgets/${uuid}`}>
          <StyledLink>{name}</StyledLink>
      </Link>
  );

  const renderAction = (uuid: number): ReactElement => (
      <Dropdown
          items={[ { content: 'Edit widget', onItemClick: () => router.push(`/widgets/${uuid}`), hash: 'edit' } ]}
          toggle={<Button iconOnly={<MoreHorizIcon color="secondary60" />} variant="subtle" />}
      />
  );

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage error={isError} />;

  return (
      <Panel>
          <StatefulTable
              columns={[
                  { header: 'Widget name', hash: 'name', render: ({ uuid, name }) => renderName(uuid, name), sortKey: 'name' },
                  { header: 'Action', hideHeader: true, hash: 'uuid', render: ({ uuid }) => renderAction(uuid), sortKey: 'uuid' },
              ]}
              items={tableItems}
              itemName="Widgets"
              stickyHeader
          />
      </Panel>
  );
};

export default Widgets;

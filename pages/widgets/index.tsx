import { Button, Dropdown, Panel, Small, Link as StyledLink, Table, TableSortDirection } from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import { useWidgetList } from '../../lib/hooks';
import { TableItem } from '../../types';

const Widgets = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnHash, setColumnHash] = useState('');
    const [direction, setDirection] = useState<TableSortDirection>('ASC');
    const router = useRouter();
    const { error, isLoading, list = [], meta = {} } = useWidgetList({
      page: String(currentPage),
      limit: String(itemsPerPage),
      ...(columnHash && { sort: columnHash }),
      ...(columnHash && { direction: direction.toLowerCase() }),
    });
    const itemsPerPageOptions = [10, 20, 50, 100];
    const tableItems: TableItem[] = list.map(({ id, name }) => ({
        id,
        name,
    }));

    const onItemsPerPageChange = newRange => {
        setCurrentPage(1);
        setItemsPerPage(newRange);
    };

    const onSort = (newColumnHash: string, newDirection: TableSortDirection) => {
        // setColumnHash(newColumnHash === 'stock' ? 'inventory_level' : newColumnHash);
        setDirection(newDirection);
    };

    const renderName = (id: number, uuid: string): ReactElement => (
        <Link href={`/widgets/${id}`}>
            <StyledLink>{uuid}</StyledLink>
        </Link>
    );

    // const renderPrice = (price: number): string => (
    //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    // );

    // const renderStock = (stock: number): ReactElement => (stock > 0
    //     ? <Small>{stock}</Small>
    //     : <Small bold marginBottom="none" color="danger">0</Small>
    // );

    const renderAction = (id: number): ReactElement => (
        <Dropdown
            items={[ { content: 'Edit widget', onItemClick: () => router.push(`/widgets/${id}`), hash: 'edit' } ]}
            toggle={<Button iconOnly={<MoreHorizIcon color="secondary60" />} variant="subtle" />}
        />
    );

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <Panel>
            <Table
                columns={[
                    { header: 'Widget name', hash: 'name', render: ({ id, name }) => renderName(id, name), isSortable: true },
                    // { header: 'Stock', hash: 'stock', render: ({ stock }) => renderStock(stock), isSortable: true },
                    // { header: 'Price', hash: 'price', render: ({ price }) => renderPrice(price), isSortable: true },
                    { header: 'Action', hideHeader: true, hash: 'id', render: ({ id }) => renderAction(id) },
                ]}
                items={tableItems}
                itemName="Widgets"
                pagination={{
                    currentPage,
                    totalItems: meta?.pagination?.total,
                    onPageChange: setCurrentPage,
                    itemsPerPageOptions,
                    onItemsPerPageChange,
                    itemsPerPage,
                }}
                sortable={{
                  columnHash,
                  direction,
                  onSort,
                }}
                stickyHeader
            />
        </Panel>
    );
};

export default Widgets;

import { Box, Button, H1, HR, Text } from '@bigcommerce/big-design';
import { ArrowBackIcon } from '@bigcommerce/big-design-icons';
import { useRouter } from 'next/router';
import { useProductList, useWidgetList } from '../lib/hooks';
import { TabIds, TabRoutes } from './header';

const InnerHeader = () => {
    const router = useRouter();
    const { pid } = router.query;
    const { list = [] } = useProductList();
    const { name } = list.find(item => item.id === Number(pid)) ?? {};
    const { uuid } = router.query;
    const { widgetList = [] } = useWidgetList();
    const { widgetName } = widgetList.find(item => item.uuid === Number(uuid)) ?? {};

    const handleBackClick = () => router.push(TabRoutes[TabIds.PRODUCTS]);

    return (
        <Box marginBottom="xxLarge">
            <Button iconLeft={<ArrowBackIcon color="secondary50" />} variant="subtle" onClick={handleBackClick}>
                <Text bold color="secondary50">Products</Text>
            </Button>
            {name &&
                <H1>{name}{widgetName}</H1>
            }
            <HR color="secondary30" />
        </Box>
    );
};

export default InnerHeader;

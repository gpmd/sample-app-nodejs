import { H1, Panel, Text } from '@bigcommerce/big-design';
import ErrorMessage from '../components/error';
import Loading from '../components/loading';
import { useWidgets } from '../lib/hooks';

const Index = () => {
    const { error, isLoading, data } = useWidgets();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <Panel header="Homepage">
            <H1>Widgets</H1>
            <Text>{data}</Text>
        </Panel>
    );
};

export default Index;

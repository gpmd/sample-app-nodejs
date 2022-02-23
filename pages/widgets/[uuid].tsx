import { useRouter } from 'next/router';
import ErrorMessage from '../../components/error';
import WidgetForm from '../../components/widgetForm';
import Loading from '../../components/loading';
import { useSession } from '../../context/session';
import { useWidgetInfo, useWidgetList } from '../../lib/hooks';
import { WidgetFormData } from '../../types';

const WidgetInfo = () => {
    const router = useRouter();
    const encodedContext = useSession()?.context;
    const uuid = Number(router.query?.uuid);
    const { error, isLoading, widgetList = [], mutateList } = useWidgetList();
    const { isLoading: isInfoLoading, widget } = useWidgetInfo(uuid, widgetList);
    const { name } = widget ?? {};
    const WidgetFormData = { name };

    const handleCancel = () => router.push('/widgets');

    const handleSubmit = async (data: WidgetFormData) => {
        try {
            const filteredList = widgetList.filter(item => item.id !== uuid);
            const { name } = data;
            const apiFormattedData = { name };

            // Update local data immediately (reduce latency to user)
            mutateList([...filteredList, { ...widget, ...data }], false);

            // Update widget details
            await fetch(`/api/widgets/${uuid}?context=${encodedContext}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiFormattedData),
            });

            // Refetch to validate local data
            mutateList();

            router.push('/widgets');
        } catch (error) {
            console.error('Error updating the widget: ', error);
        }
    };

    if (isLoading || isInfoLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <WidgetForm FormData={WidgetFormData} onCancel={handleCancel} onSubmit={handleSubmit} />
    );
};

export default WidgetInfo;

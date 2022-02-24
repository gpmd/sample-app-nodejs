import { H1, Panel, Text } from '@bigcommerce/big-design';

const Widgets = () => {
  const data = fetch("https://api.bigcommerce.com/stores/mxw8ttfcei/v3/content/widgets", {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Auth-Token": "2jt2u7hbw6mvz8kjq3cq516zh447voi"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

  return (
    <Panel>
        <H1>Widgets</H1>
        <Text>{data}</Text>
    </Panel>
  );
};

export default Widgets;

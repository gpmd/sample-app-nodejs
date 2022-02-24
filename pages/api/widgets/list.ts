export default async function list() {
  fetch("https://api.bigcommerce.com/stores/mxw8ttfcei/v3/content/widgets", {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Auth-Token": "2jt2u7hbw6mvz8kjq3cq516zh447voi"
    }
  })
  .then(response => {
    const data = response;
    console.log(data);
    return data;
  })
  .catch(err => {
    console.error(err);
  });
}

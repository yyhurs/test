export default function(num) {
  const n = Number(num);
  const d = new Date(n * 1000);
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  if (`${month}`.length === 1) month = `0${month}`;
  const date = d.getDate();
  const formatDate = `${year}-${month}-${date}`;
  return formatDate;
}

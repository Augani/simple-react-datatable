import {TableRow} from './type'
export function setHeader(arr: string) {
  let first = arr.split("");
  first[0] = first[0].toUpperCase();
  let head = first.join("");
  return head.replace("_", " ");
}

export async function getData(data: any, config: {[key:string]: any}) {
  if (Array.isArray(data)) {
    return data;
  }
  //regex check if data is a url
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  if (regex.test(data)) {
    const response = await fetch(data, config);
    const json = await response.json();
    return json;
  }
  return [];
}


export function sortData(data: TableRow[], sort: string, order: string) {
  if (sort === "") {
    sort = "id"
  }
  return data.sort((a, b) => {
    if (order === "asc") {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  }).reverse();
}

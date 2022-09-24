import NodeFormData from "form-data";

const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

export function createFormData(data: Record<string, any>) {
  let formData: any;
  if (isNode()) {
    formData = new NodeFormData();
  } else {
    formData = new FormData();
  }
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

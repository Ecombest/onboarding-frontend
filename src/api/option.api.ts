import axios from "axios";

const getOptions = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/options`);
  return response.data;
};
const createOption = async (option: any) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/options`, option);
  return response.data;
};
const optionApi = {
  getOptions,
  createOption,
};

export default optionApi;

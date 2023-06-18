import configServices from "./configService";

export const GetList = async (params = {}) => {
  return await configServices.getService(params);
};
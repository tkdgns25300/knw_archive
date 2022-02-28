import {
  Admin,
} from "../entity";

export const convertStringToEntity = (entityName: string) => {
  const convertList = {
    ["Admin"]: Admin,
  };
  return convertList[entityName];
};

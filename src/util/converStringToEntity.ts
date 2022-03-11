import {
  ActivityScope,
  Admin, Author, ChronologyItem, MainBanner, Media, Relevance, WorkItem,
} from "../entity";

export const convertStringToEntity = (entityName: string) => {
  const convertList = {
    ["ActivityScope"]: ActivityScope,
    ["Admin"]: Admin,
    ["Author"]: Author,
    ["ChronologyItem"]: ChronologyItem,
    ["MainBanner"]: MainBanner,
    ["Media"]: Media,
    ["Relevance"]: Relevance,
    ["WorkItem"]: WorkItem,
  };
  return convertList[entityName];
};

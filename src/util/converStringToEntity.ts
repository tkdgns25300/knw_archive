import {
  ActivityScope,
  Admin, Author, ChronologyItem, Growth, MainBanner, Media, Relevance, WorkItem,
} from "../entity";

export const convertStringToEntity = (entityName: string) => {
  const convertList = {
    ["ActivityScope"]: ActivityScope,
    ["Admin"]: Admin,
    ["Author"]: Author,
    ["ChronologyItem"]: ChronologyItem,
    ["Growth"]: Growth,
    ["MainBanner"]: MainBanner,
    ["Media"]: Media,
    ["Relevance"]: Relevance,
    ["WorkItem"]: WorkItem,
  };
  return convertList[entityName];
};

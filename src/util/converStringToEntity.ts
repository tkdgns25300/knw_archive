import {
  ActivityScope,
  Admin, Author, ChronologyItem, Dataset, Growth, MainBanner, Media, Relevance, WorkItem,
} from "../entity";

export const convertStringToEntity = (entityName: string) => {
  const convertList = {
    ["ActivityScope"]: ActivityScope,
    ["Admin"]: Admin,
    ["Author"]: Author,
    ["ChronologyItem"]: ChronologyItem,
    ["Dataset"]: Dataset,
    ["Growth"]: Growth,
    ["MainBanner"]: MainBanner,
    ["Media"]: Media,
    ["Relevance"]: Relevance,
    ["WorkItem"]: WorkItem,
  };
  return convertList[entityName];
};

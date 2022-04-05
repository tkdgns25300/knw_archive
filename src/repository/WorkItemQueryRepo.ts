import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { WorkItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {WorkItemSearchReq} from "../api";

@Service()
@EntityRepository(WorkItem)
export class WorkItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('work_item', 'WorkItem');
  }
    search(param: WorkItemSearchReq) {

    if(param.getColumn === "all") {
      return createQueryBuilder()
          .select("work_item")
          .from(WorkItem, "work_item")
          .where(`(work_item.ref_content like :${param.getColumn} OR work_item.title like :${param.getColumn})`, {
            [param.getColumn]: `%${param.getKeyword}%`,
          }) .andWhere("work_item.genre like :genre", {genre: `%${param.getGenre}%`})
          .orderBy('work_item.published_from', param.getOrder)
          .skip(param.getOffset())
          .take(param.getLimit())
          .getManyAndCount();
    }


     return createQueryBuilder()
         .select("work_item")
         .from(WorkItem, "work_item")
         .where(`work_item.${param.getColumn} like :${param.getColumn} `, {
           [param.getColumn]: `%${param.getKeyword}%`,
         })
         .andWhere("work_item.genre like :genre", {genre: `%${param.getGenre}%`})
         .orderBy('work_item.published_from', param.getOrder)
         .skip(param.getOffset())
         .take(param.getLimit())
         .getManyAndCount();
    }
}

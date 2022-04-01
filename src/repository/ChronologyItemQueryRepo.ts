import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { ChronologyItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(ChronologyItem)
export class ChronologyItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('chronology_item', 'ChronologyItem');
  }

    search(param: PageReq) {
        return createQueryBuilder("chronology_item")
            .leftJoinAndSelect("ChronologyItem.proof_items", "proof_item")
            .orderBy('ChronologyItem.period', param.getOrder)
            .skip(param.getOffset())
            .take(param.getLimit())
            .getManyAndCount();
    }

}

import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import {ProofItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import { PageReq} from "../api";

@Service()
@EntityRepository(ProofItem)
export class ProofItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('proof_item', 'ProofItem');
  }

  async findAll(param: PageReq) {
    return await createQueryBuilder("proof_item")
        .leftJoinAndSelect("ProofItem.chronology_id", "chronology_item")
        .select([
          "ProofItem.id",
          "ProofItem.file_src",
          "ProofItem.reference",
          "ProofItem.content",
          "ProofItem.is_visible",
          "ProofItem.updated_at",
          "ProofItem.created_at",
          "chronology_item.id",
          "chronology_item.content",
          "chronology_item.period",
        ])
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

}

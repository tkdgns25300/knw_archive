import {EntityRepository} from "typeorm";
import { Service } from "typedi";

import {ProofItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(ProofItem)
export class ProofItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('proof_item', 'ProofItem');
  }

}

import { TagAggregator } from "@affinity-lab/carbonite-tag";
import {Entity} from "typeorm"
import {Export} from "@affinity-lab/util";

@Entity({name: 'taks_tags', orderBy:{tag:"ASC"}})
export class Tags extends TagAggregator {
	@Export() public tag:string;
	@Export() public group:string;
}
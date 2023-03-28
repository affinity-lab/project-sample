import { TagAggregator } from "@affinity-lab/carbonite-tag";
import {Entity} from "typeorm"

@Entity({name: 'to_my_tags'})
export class Tags extends TagAggregator {
}
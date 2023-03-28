import {Column, CreateDateColumn, Entity} from "typeorm";
import {Atom} from "@affinity-lab/carbonite"
import {AttachmentCollection, Collection} from "@affinity-lab/carbonite-attachment";
import {Dimension, Export} from "@affinity-lab/util";

@Entity({orderBy:{created_at:"ASC"}})
export class Task extends Atom {
	@Export() id: number;
	@Export() @Column({type: "varchar", length: 255}) name: string;
	@Export() @Column({type: "boolean"}) status: boolean;
	@CreateDateColumn() created_at: Date;
	// @Tag(Tags, null) @Column({type: "json"}) tags: Array<string> = [];
	// @Sequence() @Column({type: "int", nullable: true}) sequence: null | number = null;
	@AttachmentCollection("image/*", 1, 1024, new Dimension(100, 100)) readonly image: Collection;
}
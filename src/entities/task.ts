import {Column, CreateDateColumn, Entity} from "typeorm";
import {Atom} from "@affinity-lab/carbonite"
import {AttachmentCollection, Collection} from "@affinity-lab/carbonite-attachment";
import {Export} from "@affinity-lab/util";
import {Sequence} from "@affinity-lab/carbonite-sequence";
import {Tags} from "./tags";
import {Tag} from "@affinity-lab/carbonite-tag";

@Entity({orderBy: {sequence: "ASC"}})
export class Task extends Atom {
	@Export() id: number;
	@Export() @Column({type: "varchar", length: 255}) name: string;
	@Export() @Column({type: "boolean"}) status: boolean;
	@CreateDateColumn() created_at: Date;
	@Tag(Tags, null) @Column({type: "json"}) tags: Array<string> = [];
	@Export() @Sequence() @Column({type: "int", nullable: true}) sequence: null | number = Infinity;
	@AttachmentCollection("image/*", 1, 1024) readonly image: Collection;
	@Export() get img(): Promise<object> {return this.image.first.then(res => res?.export())}

	public save(): Promise<this> {
		let tags = this.name.match(/#\w+(?=\s|$)/gu);
		this.tags = tags === null ? [] : tags.map(tag => tag.substr(1));
		return super.save();
	}
}
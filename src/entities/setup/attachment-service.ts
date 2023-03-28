// At this point you need to import AttachmentService from the file it exports:
import AttachmentService from "@affinity-lab/carbonite-attachment/src/attachment-service";
import {PRIVATE_ATTACHMENT_PATH, PRIVATE_ATTACHMENT_TABLE} from "$env/static/private";

AttachmentService.initialize(
	PRIVATE_ATTACHMENT_PATH,
	PRIVATE_ATTACHMENT_TABLE
);

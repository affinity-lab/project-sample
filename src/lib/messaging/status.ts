import {DefaultResponseStatus} from "@affinity-lab/sk-messaging";

enum MyResponseStatus {
	SUCCESS,
	FAILURE,
}

export const Status = {
	...DefaultResponseStatus,
	...MyResponseStatus
}
import type {Task} from "../../task";

export default class DragAndDrop {
	private static dragOverCount = 0;
	private static draggedTask:undefined|Task;

	constructor(private node: HTMLElement, private grip: HTMLElement = undefined) {
		grip.addEventListener("mousedown", () => node.draggable = true)
		grip.addEventListener("mouseup", () => node.draggable = false)
		node.addEventListener("dragend", () => node.draggable = false)
		node.addEventListener("dragstart", (e) => {
			console.log("START")
			DragAndDrop.draggedTask = task;
			console.log(DragAndDrop.draggedTask)
		})
		node.addEventListener("drop", (e) => {
			e.preventDefault();
			node.classList.remove("drag-over");
			console.log(DragAndDrop.draggedTask)
			if(DragAndDrop.draggedTask === undefined) return;
			if(DragAndDrop.draggedTask === task) return;
			console.log("DROP")
			this.stop()
		})
		node.addEventListener("dragover", (e) => e.preventDefault())
		node.addEventListener("dragenter", (e) => {
			e.preventDefault();
			if (DragAndDrop.dragOverCount === 0) node.classList.add("drag-over");
			DragAndDrop.dragOverCount++
		})
		node.addEventListener("dragleave", () => {
			DragAndDrop.dragOverCount = Math.max(--DragAndDrop.dragOverCount, 0);
			if (DragAndDrop.dragOverCount === 0) {
				node.classList.remove("drag-over");
			}
		})
	}
	stop(){
		// DragAndDrop.draggedTask = undefined;
		DragAndDrop.dragOverCount = 0;
	}

}
class DragAndDrop {
	private dragOverCount = 0;

	constructor(private node: HTMLElement, private grip: HTMLElement, private reorder: (id: number, to: number) => void) {
		grip.addEventListener("mousedown", () => node.draggable = true)
		grip.addEventListener("mouseup", () => node.draggable = false)
		node.addEventListener("dragend", () => node.draggable = false)
		node.addEventListener("dragstart", (e) => e.dataTransfer.setData("text", JSON.stringify({id: parseInt(node.dataset["id"]), sequence: parseInt(node.dataset["sequence"])})))
		node.addEventListener("drop", (e) => {
			e.preventDefault();
			node.classList.remove("drag-over");
			let data = JSON.parse(e.dataTransfer.getData("text"));
			let id = data.id;
			let sequence = data.sequence;
			if (id === node.dataset["id"]) return;
			let to = parseInt(node.dataset["sequence"]);
			if (to > sequence) to++
			this.dragOverCount = 0;
			this.reorder(id, to);
		})
		node.addEventListener("dragover", (e) => e.preventDefault())
		node.addEventListener("dragenter", (e) => {
			e.preventDefault();
			if (this.dragOverCount === 0) node.classList.add("drag-over");
			this.dragOverCount++
		})
		node.addEventListener("dragleave", () => {
			this.dragOverCount = Math.max(--this.dragOverCount, 0);
			if (this.dragOverCount === 0) {
				node.classList.remove("drag-over");
			}
		})
	}
}

export function dragAndDrop(node: HTMLElement, parameters: { grip: string, reorder: (id: number, to: number) => void }) {
	new DragAndDrop(node, node.querySelector(parameters.grip), parameters.reorder)
}
import { ref } from "vue";

export default function useDialog<T>() {
	const visible = ref(false);
	const dialogData = ref<T>();

	function openDialog(data?: T) {
		if (data) {
			dialogData.value = data;
		}
		visible.value = true;
	}
	function closeDialog() {
		visible.value = false;
	}

	return { visible, dialogData, openDialog, closeDialog };
}

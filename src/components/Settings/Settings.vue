<template>
	<a-drawer v-model:visible="visible" title="Settings" placement="right">
		<a-tabs>
			<a-tab-pane key="goals" tab="Weight">
				<SettingsWeight />
			</a-tab-pane>
		</a-tabs>
	</a-drawer>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import SettingsWeight from './SettingsWeight.vue';

const props = defineProps<{
	visible: boolean;
}>();
const emits = defineEmits(['close']);

const visible = ref(props.visible);

watch(
	() => props.visible,
	() => (visible.value = props.visible)
);
watch(
	() => visible.value,
	() => {
		if (!visible.value) emits('close');
	}
);
</script>

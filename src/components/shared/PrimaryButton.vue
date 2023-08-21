<template>
	<a-button type="primary" class="primary-button" @click="emits('click')">{{ text }}</a-button>
</template>

<script setup lang="ts">
defineProps<{
	text: string;
}>();

const emits = defineEmits(['click']);
</script>

<style scoped lang="scss">
.primary-button {
	border-radius: 50px;
	font-weight: bold;
	padding: 0px 30px;
}
</style>

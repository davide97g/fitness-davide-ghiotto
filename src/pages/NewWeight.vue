<template>
	<Avatar :position="'topLeft'" />
	<h1 style="margin-top: 10px">New Weight</h1>
	<div
		style="
			padding: 10px;
			height: calc(100vh - 120px);
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		"
	>
		<div style="display: flex; flex-direction: column; width: 200px">
			<a-typography-text>Date</a-typography-text>
			<a-date-picker v-model:value="date" />
		</div>
		<div style="display: flex; flex-direction: column; width: 200px">
			<a-typography-text>Weight</a-typography-text>
			<a-input-number v-model:value="weight" addon-after="kg" :min="0" />
		</div>
	</div>
	<div class="flex-center" style="justify-content: space-around">
		<PrimaryButton text="SAVE" @click="addNewWeightRecord" :disabled="!date || !weight" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataBaseClient } from '../api/db';
import { NewWeightRecord } from '../models/weight';
import { setIsLoading } from '../services/utils';
import type { Dayjs } from 'dayjs';

const date = ref<Dayjs>();
const weight = ref(0);

const addNewWeightRecord = () => {
	const newWeightRecord: NewWeightRecord = {
		weight: weight.value,
		day: String(date.value?.day()),
		month: String(date.value?.month()),
		year: String(date.value?.year()),
	};
	setIsLoading(true);
	DataBaseClient.WeightRecord.create(newWeightRecord)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			setIsLoading(false);
		});
};
</script>

<style scoped lang="scss"></style>

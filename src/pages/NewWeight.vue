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
import { WeightRecord } from '../models/weight';
import { setIsLoading } from '../services/utils';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { router } from '../router';

const date = ref<Dayjs>();
const weight = ref(0);

const urlSearchParams = new URLSearchParams(window.location.search);
const dateParam = urlSearchParams.get('date');
const weightParam = urlSearchParams.get('weight');
if (dateParam) date.value = dayjs(dateParam);
if (weightParam) weight.value = Number(weightParam);

const addNewWeightRecord = () => {
	const day = String(date.value?.date());
	const month = String(date.value?.month());
	const year = String(date.value?.year());
	const id = `${year}-${month}-${day}`;
	const newWeightRecord: WeightRecord = {
		id,
		weight: weight.value,
		day,
		month,
		year,
	};
	setIsLoading(true);
	DataBaseClient.WeightRecord.create(newWeightRecord)
		.then(() => {
			router.push({ name: 'Weight' });
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

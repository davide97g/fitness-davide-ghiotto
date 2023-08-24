<template>
	<div
		style="
			display: flex;
			flex-direction: column;
			gap: 1rem;
			position: relative;
			overflow-y: auto;
		"
	>
		<a-typography-text>Heatmap</a-typography-text>
		<WeightHeatmap
			:days="days"
			:month="month"
			:year="year"
			:weightRecordsMap="weightRecordsMap"
		/>
		<a-typography-text>Bars</a-typography-text>
		<WeightBars :days="days" :month="month" :year="year" :weightRecordsMap="weightRecordsMap" />
		<!-- <a-typography-text>Chart</a-typography-text>
		<apexchart width="100%" type="line" :options="chartOptions" :series="series"></apexchart> -->
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataBaseClient } from '../../api/db';
import { WeightRecord } from '../../models/weight';
import WeightHeatmap from './WeightHeatmap.vue';

const { month, year } = defineProps<{
	month: string;
	year: string;
}>();

const lastDay = new Date(Number(year), Number(month), 0).getDate();
const days = Array.from({ length: lastDay }, (_, i) => String(i + 1));

const weightRecordsMap = ref<{
	[key: string]: WeightRecord;
}>({});

DataBaseClient.WeightRecord.get({
	month,
	year,
})
	.then(records => {
		records.forEach(record => {
			weightRecordsMap.value[record.id] = record;
		});
	})
	.catch(err => {
		console.error(err);
	});

const chartOptions = {
	chart: {
		id: 'vuechart-example',
	},
	xaxis: {
		categories: days,
	},
	stroke: {
		curve: 'smooth',
	},
};
const series = [
	{
		name: 'series-1',
		data: [30, 40, 35, 50, 49, 60, 70, 91],
	},
];
</script>

<style scoped lang="scss"></style>

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
		<WeightHeatmap
			:days="days"
			:month="month"
			:year="year"
			:weightRecordsMap="weightRecordsMap"
		/>
		<WeightBars :days="days" :month="month" :year="year" :weightRecordsMap="weightRecordsMap" />
		<apexchart
			width="100%"
			height="200px"
			style="padding-right: 1rem"
			type="line"
			:options="chartOptions"
			:series="series"
		></apexchart>
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

const chartOptions = {
	chart: {
		id: 'vuechart-example',
		toolbar: {
			show: false,
		},
	},
	xaxis: {
		labels: {
			show: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: 'smooth',
	},
	legend: {
		show: false,
	},
};
const series = ref<
	{
		name: string;
		data: (number | undefined)[];
	}[]
>([]);

DataBaseClient.WeightRecord.get({
	month,
	year,
})
	.then(records => {
		records.forEach(record => {
			weightRecordsMap.value[record.id] = record;
		});
		series.value.push({
			name: 'Weight',
			data: days.map(day => {
				const record = weightRecordsMap.value[`${year}-${month}-${day}`];
				return record ? record.weight : undefined;
			}),
		});
	})
	.catch(err => {
		console.error(err);
	});
</script>

<style scoped lang="scss"></style>

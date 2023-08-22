<template>
	<div style="display: flex; flex-wrap: wrap; gap: 9px">
		<div v-for="day in days" :key="day" @click="onCellClick(day)">
			<div v-if="getRecordFromDay(day)" class="day" :class="getColorClassFromRecord(day)">
				{{ getRecordFromDay(day).weight }}
			</div>
			<div v-else class="day empty-day">
				{{ day }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataBaseClient } from '../../api/db';
import { WeightRecord } from '../../models/weight';
import { router, NewRecordPageName } from '../../router';

const { month, year } = defineProps<{
	month: string;
	year: string;
}>();

const lastDay = new Date(Number(year), Number(month), 0).getDate();
const days = Array.from({ length: lastDay }, (_, i) => String(i + 1));

const weightRecordsMap = ref<{
	[key: string]: WeightRecord;
}>({});

const avgWeight = ref<number>(0);

const getRecordFromDay = (day: string) => {
	const id = `${year}-${month}-${day}`;
	return weightRecordsMap.value[id];
};

const getColorClassFromRecord = (day: string) => {
	const record = getRecordFromDay(day);
	const diff = avgWeight.value - record.weight;
	// TODO: gradient from red to green with min and max
	if (diff > 0) {
		return { red: true };
	} else if (diff < 0) {
		return { green: true };
	} else {
		return { gray: true };
	}
};

DataBaseClient.WeightRecord.get({
	month,
	year,
})
	.then(records => {
		records.forEach(record => {
			weightRecordsMap.value[record.id] = record;
		});
		avgWeight.value = records.reduce((acc, cur) => acc + cur.weight, 0) / records.length;
	})
	.catch(err => {
		console.error(err);
	});

const onCellClick = (day: string) => {
	router.push({
		name: NewRecordPageName,
		query: {
			date: `${year}-${parseInt(month) + 1}-${day}`,
			avg: avgWeight.value,
		},
	});
};
</script>

<style scoped lang="scss">
.day {
	width: 45px;
	height: 45px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	&.red {
		background-color: red;
		font-weight: 600;
	}
	&.green {
		background-color: green;
		font-weight: 600;
	}
	&.gray {
		background-color: gray;
		font-weight: 600;
	}
}
.empty-day {
	background-color: #e0e0e0;
	color: gray;
	font-weight: 200;
}
</style>

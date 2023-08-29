<template>
	<div style="display: flex; flex-wrap: wrap; gap: 9px">
		<div v-for="day in emptyDays" :key="day" class="day gray">
			{{ getDayFromPreviousMonth(day) }}
		</div>
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
import { router, NewRecordPageName } from '../../router';
import { WeightRecord } from '../../models/weight';
import { useUserStore } from '../../stores/user';

const { days, month, year, weightRecordsMap } = defineProps<{
	days: string[];
	month: string;
	year: string;
	weightRecordsMap: {
		[key: string]: WeightRecord;
	};
}>();

const weekdayOfFirstDay = new Date(`${year}-${parseInt(month) + 1}-01`).getDay();
console.info('weekdayOfFirstDay', weekdayOfFirstDay, new Date(`${year}-${parseInt(month) + 1}-01`));
const emptyDays = Array.from({ length: weekdayOfFirstDay - 1 }, (_, i) => i + 1);

const getDayFromPreviousMonth = (day: number) => {
	const previousMonth = parseInt(month) === 0 ? 12 : parseInt(month);
	const previousYear = parseInt(month) === 0 ? parseInt(year) - 1 : parseInt(year);
	const daysInPreviousMonth = new Date(previousYear, previousMonth, 0).getDate();
	return daysInPreviousMonth - emptyDays.length + day;
};

const userStore = useUserStore();

const getRecordFromDay = (day: string) => {
	const id = `${year}-${month}-${day}`;
	return weightRecordsMap[id];
};

const avgWeight = ref<number>(0);

if (userStore.user?.settings) {
	const { goalWeight, lowestAllowedWeight } = userStore.user.settings;
	if (goalWeight && lowestAllowedWeight) {
		const avg = (goalWeight + lowestAllowedWeight) / 2;
		avgWeight.value = avg;
	}
}

const getColorClassFromRecord = (day: string) => {
	const record = getRecordFromDay(day);
	const diff = avgWeight.value - record.weight;
	// TODO: gradient from red to green with min and max
	if (diff > 0) return { red: true };
	else if (diff < 0) return { green: true };
};

const onCellClick = (day: string) => {
	router.push({
		name: NewRecordPageName,
		query: {
			date: `${year}-${parseInt(month) + 1}-${day}`,
			weight: getRecordFromDay(day)?.weight,
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
	background-color: #5a83a9;
	font-weight: 600;
	color: white;
	&.red {
		background-color: #a63d1c;
		font-weight: 600;
		color: white;
	}
	&.green {
		background-color: #63a063;
		font-weight: 600;
		color: white;
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

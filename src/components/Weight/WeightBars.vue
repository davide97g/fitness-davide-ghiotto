<template>
	<!-- center this div horizontally even when it goes out of screen -->
	<div
		style="
			display: flex;
			gap: 10px;
			overflow-x: auto;
			justify-content: center;
			position: relative;
			&::-webkit-scrollbar {
				display: none;
			}
		"
	>
		<div v-for="day in days" :key="day" class="bar-container">
			<div
				class="day-bar"
				:class="{ ...getColorClassFromRecord(day), selected: day === selected }"
			/>
			{{ day }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const userStore = useUserStore();

const avgWeight = ref<number>(0);

const selected = ref<string>(new Date().getDate().toString());

const getRecordFromDay = (day: string) => {
	const id = `${year}-${month}-${day}`;
	return weightRecordsMap[id];
};

if (userStore.user?.settings) {
	const { goalWeight, lowestAllowedWeight } = userStore.user.settings;
	if (goalWeight && lowestAllowedWeight) {
		const avg = (goalWeight + lowestAllowedWeight) / 2;
		avgWeight.value = avg;
	}
}

const getColorClassFromRecord = (day: string) => {
	const record = getRecordFromDay(day);
	if (!record) return { empty: true };
	const diff = avgWeight.value - record.weight;
	// TODO: gradient from red to green with min and max
	if (diff > 0) return { red: true };
	else if (diff < 0) return { green: true };
};
</script>

<style scoped lang="scss">
.bar-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 5px;
}
.day-bar {
	width: 10px;
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
	&.selected {
		width: 13px;
		border: 1px solid #5a83a9;
		height: 95px;
	}
	&.empty {
		background-color: #e0e0e0;
		color: gray;
		font-weight: 200;
	}
}
</style>

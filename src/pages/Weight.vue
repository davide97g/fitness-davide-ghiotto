<template>
	<Avatar :position="'topLeft'" />
	<h1>Weight</h1>
	<SettingOutlined @click="sideMenuVisible = true" id="icon-open-settings" />
	<Settings :visible="sideMenuVisible" @close="sideMenuVisible = false" />
	<a-tabs
		v-model:activeKey="activeYear"
		style="padding: 10px; height: calc(100vh - 100px); position: relative"
	>
		<a-tab-pane :key="year" :tab="year" v-for="year in YEARS">
			<a-tabs v-model:activeKey="activeMonth">
				<a-tab-pane :key="month" :tab="month" v-for="month in MONTHS">
					<WeightMonthYear :month="String(getMonthNumber(month))" :year="year" />
				</a-tab-pane>
			</a-tabs>
		</a-tab-pane>
	</a-tabs>
	<div class="flex-center" style="justify-content: space-around">
		<PrimaryButton text="NEW WEIGHT" @click="router.push({ name: NewRecordPageName })" />
	</div>
</template>

<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue/lib/icons';
import { ref } from 'vue';
import Avatar from '../components/shared/Avatar.vue';
import Settings from '../components/Settings/Settings.vue';
import PrimaryButton from '../components/shared/PrimaryButton.vue';
import { MONTHS, YEARS, getMonthNumber } from '../services/utils';
import { NewRecordPageName, router } from '../router';

const activeMonth = ref(MONTHS[new Date().getMonth()]);
const activeYear = ref(new Date().getFullYear().toString());

// *** side menu
const sideMenuVisible = ref(false);
</script>

<style scoped lang="scss">
#icon-open-settings {
	position: absolute;
	top: 10px;
	right: 10px;
	height: 25px;
	width: 25px;
}
.stats-icon {
	position: absolute;
	top: 20px;
	right: 10px;
	height: 25px;
	width: 25px;
	padding: 10px;
	display: flex;
	align-items: center;
}
</style>

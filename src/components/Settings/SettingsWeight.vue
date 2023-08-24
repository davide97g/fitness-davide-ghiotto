<template>
	<div style="display: flex; flex-direction: column; gap: 1rem">
		<div style="display: flex; flex-direction: column; gap: 1rem">
			<a-typography-text>Goals Weight</a-typography-text>
			<a-input-number v-model:value="goal" addon-after="kg" :min="0" />
		</div>
		<div style="display: flex; flex-direction: column; gap: 1rem">
			<a-typography-text>Lowest Allowed Weight</a-typography-text>
			<a-input-number v-model:value="lowestAllowed" addon-after="kg" :min="0" />
		</div>
		<div
			style="
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			"
		>
			<a-button type="primary" @click="cancel">Cancel</a-button>
			<PrimaryButton text="SAVE" @click="save" :disabled="!goal || !lowestAllowed" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { DataBaseClient } from '../../api/db';

const userStore = useUserStore();
const goal = ref(userStore.user?.settings?.goalWeight);
const lowestAllowed = ref(userStore.user?.settings?.lowestAllowedWeight);

const cancel = () => {
	goal.value = userStore.user?.settings?.goalWeight;
	lowestAllowed.value = userStore.user?.settings?.lowestAllowedWeight;
};

const save = () => {
	if (!goal.value || !lowestAllowed.value || !userStore.user) return;

	const user = {
		...userStore.user,
		settings: {
			...userStore.user?.settings,
			goalWeight: goal.value,
			lowestAllowedWeight: lowestAllowed.value,
		},
	};

	DataBaseClient.User.updateUser(user)
		.then(() => {
			userStore.setUser(user);
		})
		.catch(err => {
			console.log(err);
		});
};
</script>

<style scoped lang="scss"></style>

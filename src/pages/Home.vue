<template>
	<Avatar :position="'topCenter'" v-if="isLoggedIn" :size="'large'" />
	<div
		style="
			display: flex;
			flex-direction: column;
			height: 100vh;
			align-items: center;
			justify-content: center;
		"
	>
		<Version />
		<h1>Personal Fitness</h1>
		<p>Welcome to the Fitness part of my website</p>
		<p>Here I managed my personal fitness.</p>
		<a-divider />
		<div v-if="isLoggedIn !== undefined">
			<router-link :to="{ name: LoginPageName }" v-if="!isLoggedIn">
				<a-button type="primary">Login</a-button>
			</router-link>
			<p v-else-if="!isAdmin">
				I'm sorry but the public areas of the website are still under construction.
			</p>
			<div class="flex-center column" v-else>
				<router-link :to="{ name: WeightPageName }" class="m1">
					<a-button type="primary"> <HomeOutlined /> Weight</a-button>
				</router-link>
			</div>
		</div>
		<div v-else>
			<a-spin size="large" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import Avatar from '../components/shared/Avatar.vue';
import Version from '../components/Version.vue';
import { WeightPageName, LoginPageName } from '../router';
import { isAdmin, isLoggedIn } from '../services/utils';
</script>

import { useAuthStore } from '~/store';

export default defineNuxtPlugin(({ $pinia }) => {
	return {
		provide: {
			store: useAuthStore($pinia),
		},
	};
});


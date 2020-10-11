import { ref, onMounted } from 'vue';

export const useAsync = (func: () => Promise<unknown>) => {
  const loading = ref(false);

  onMounted(async () => {
    try {
      loading.value = true;
      await func();
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  });

  return loading;
};

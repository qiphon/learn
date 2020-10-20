import { ref, watch, onMounted, Ref } from 'vue';

function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  watch(x, () => {
    console.log('Hooks Setup外部检测', x.value);
  });
  return { x, y };
}
function getDivDom(root: Ref<HTMLInputElement>): HTMLInputElement {
  const divDom: HTMLInputElement = root.value;
  onMounted(() => {
    console.log('🦑组件构建成功');
    console.log(root.value);
    root.value.value = '🦑组件构建成';
  });
  return divDom;
}
export { useMousePosition, getDivDom };

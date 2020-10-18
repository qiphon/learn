import {
  defineComponent,
  h,
  ref,
  onMounted,
  onUnmounted,
  watch,
  toRefs,
  PropType,
  Ref,
} from 'vue';

import Highcharts, { Chart, Options } from 'highcharts';
import { hasKey } from '@/utils';

const vueHighcharts = defineComponent({
  name: 'VueHighcharts',
  props: {
    type: {
      type: String as PropType<keyof typeof Highcharts>,
      default: 'chart',
    },
    options: {
      type: Object as PropType<Options>,
      required: true,
    },
    redrawOnUpdate: {
      type: Boolean,
    },
    oneToOneUpdate: {
      type: Boolean,
      default: false,
    },
    animateOnUpdate: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const chartRef = ref(null);
    const chart: Ref<null | Chart> = ref(null);
    const { options } = toRefs(props);

    if (options?.value && hasKey(Highcharts, props.type)) {
      watch(
        options,
        (newValue) => {
          if (chart.value !== null) {
            ((chart as unknown) as Ref<Chart>).value.update(
              newValue,
              props.redrawOnUpdate,
              props.oneToOneUpdate,
              props.animateOnUpdate
            );
            emit('updated');
          }
        },
        { deep: true }
      );

      onMounted(() => {
        chart.value = (Highcharts as any)[props.type](
          chartRef.value,
          options.value,
          () => {
            emit('rended');
          }
        );
      });
      onUnmounted(() => {
        if (chart?.value) {
          ((chart as unknown) as Ref<Chart>).value.destroy();
        }
        emit('destroyed');
      });
    } else if (!props.options) {
      console.warn('the "options" paramter is required');
    } else {
      console.warn(
        `${props.type} is not a valid highcharts type or has not been imported!`
      );
    }

    return {
      chartRef,
      chart,
    };
  },

  render() {
    return h('div', {
      class: 'vue-highcharts',
      ref: 'chartRef',
    });
  },
});

export default vueHighcharts;

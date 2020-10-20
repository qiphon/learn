/* 
    composition Api VS options Api
*/

/* 
    1.代码组织
    Options API是把代码分类写在几个Option中：
    export default {
        components: {
            
        },
        data() {
            
        },
        computed: {
            
        },
        watch: {
            
        },
        mounted() {
            
        },
    }
    可以看张图,相同的颜色表示一种逻辑
        使用Options API时，相同的逻辑写在不同的地方，各个逻辑的代码交叉错乱，这对维护别人代码的开发者来说绝不是一件简单的事，
        理清楚这些代码都需要花费不少时间。
        而使用Composition API时，相同的逻辑可以写在同一个地方，这些逻辑甚至可以使用函数抽离出来，各个逻辑之间界限分明，
        即便维护别人的代码也不会在“读代码”上花费太多时间（前提是你的前任会写代码）。
    不过需要指出的是，
        Composition API提高了代码的上限，也降低了代码的下限。在使用Options API时，即便再菜的鸟也能保证各种代码按其种类进行划分。
        但使用Composition API时，由于其开放性，出现什么代码是无法想象的。但毫无疑问，Options API到Composition API是vue的一个巨大进步，
        vue从此可以从容面对大型项目。
    
*/

/* 
    2.逻辑抽取与复用
    在vue2中要实现逻辑复用主要有两种方式：
        a.mixin，mixin的确能抽取逻辑并实现逻辑复用（我更多用它来定义接口），但这种方式着实不好，mixin更多是一种代码复用的手段：
            (1)命名冲突。mixin的所有option如果与组件或其它mixin相同会被覆盖（这个问题可以使用Mixin Factory解决）。
            (2)没有运行时实例。顾名思义，mixin不过是把对应的option混入组件内，运行时不存在所抽取的逻辑实例。
            (3)松散的关系。Options API注定所抽取的逻辑的组织是松散，逻辑内部之间的关系也是松散的。
            (4)含蓄的属性增加。mixin加入的option是含蓄的，新手会迷惑于莫名其妙就存在的一个属性，尤其是在有多个mixin的时候，无法知道当前属性是哪个mixin的。
        b.Scoped slot,scoped slot也可以实现逻辑抽取，使用一个组件抽取逻辑，然后通过作用域插槽暴露给子组件。
            
            // GenericSort.vue
            <template>
            <div>
                <!-- 暴露逻辑的数据给子组件 -->
                <slot :data="data"></slot>
            </div>
            </template>
            <script>
            export default {
            // 在这里完成逻辑
            data() {
                
            }
            }
            </script>
            使用的时候
            <template>
                <!--传入未排序的数据unSortdata-->
                <GenericSort data="unSortdata">
                <template v-slot="sortData">
                <!-- 使用经过处理后的sortData数据 -->
                
                <template>
                </GenericSearch>
            </template>
            // 但是有缺点
                性能差。仅为了抽取逻辑，需要创建维护一个组件实例。
                一般需要增加配置，不灵活。需要在slot上增加配置，以应对更多的情况。
                
    

*/
// vue3中提供了Composition的方式，这种方式允许像函数般抽离逻辑
/* 
  1.当前基于选项的API概念与新的合成API（基于函数的API）概念的区别在于：
    基于选项的API：组件包含属性/方法/选项的类型。
      组件选项可能变得组织起来复杂且难以维护（怪异的组件）。逻辑可能涉及props和data()的属性，某些方法，
      某个钩子（beforeMount/mounted）以及值班的watch。因此，
      一个逻辑将分散在多个选项中。
    组合API：组件将逻辑封装到函数中。
      使用Composition API，每个功能都是大型组件的一部分，它封装了与逻辑相关的所有代码（属性，方法，钩子，watch观察者）。
      现在，较小的代码（函数）可以重复使用，并且组织得很好。
*/
const { ref } = Vue;
// 逻辑抽取
const useCountdown = (initialCount) => {
  const count = ref(initialCount);
  const state = ref(false);
  const start = (initCount) => {
    state.value = true;
    if (initCount > 0) {
      count.value = initCount;
    }
    if (!count.value) {
      count.value = initialCount;
    }
    const interval = setInterval(() => {
      if (count.value === 0) {
        clearInterval(interval);
        state.value = false;
      } else {
        count.value--;
      }
    }, 1000);
  };
  return {
    count,
    start,
    state,
  };
};

const App = {
  template: `
        <div>
            <p> {{count}}</p>
            <button @click="onClick" :disabled="state">Start</button>  
        </div>
    `,
  setup() {
    // 直接使用倒计时逻辑
    const { count, start, state } = useCountdown(10);
    const onClick = () => {
      start();
    };
    return { count, onClick, state };
  },
};

/* 
vue3建议使用如React hook中一样使用use开头命名抽取的逻辑函数，
如上代码抽取的逻辑几乎如函数一般，使用的时候也极其方便，完胜vue2中抽取逻辑的方法。
*/

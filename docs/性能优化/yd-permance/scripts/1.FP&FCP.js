console.log('计算页面FP和FCP的时间');

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // console.log(entry);
    console.log('类型🚀', entry.entryType);
    console.log('具体指标🚀', entry.name);
    console.log('开始时间⏰', entry.startTime);
    console.log('duration⌚️', entry.duration);
    console.log('-----------------------');
  }
});
observer.observe({ entryTypes: ['paint'] });

// let t = performance.timing
// console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
// console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
// console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
// console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
// console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
// console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
// console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

// if(t = performance.memory){
//     console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
// }

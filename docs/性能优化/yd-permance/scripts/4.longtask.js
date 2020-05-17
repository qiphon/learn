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
observer.observe({ entryTypes: ['longtask'] });

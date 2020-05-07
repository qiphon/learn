// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
    async list(page = 1) {
        // read config// config/config.default.js
        // const { serverUrl, pageSize } = this.config.news;
        // const { serverUrl, pageSize } = {
        //     pageSize: 5,
        //     serverUrl: 'https://hacker-news.firebaseio.com/v0',
        //   }

        // // use build-in http client to GET hacker-news api
        // const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
        //     data: {
        //         orderBy: '"$key"',
        //         startAt: `"${pageSize * (page - 1)}"`,
        //         endAt: `"${pageSize * page - 1}"`,
        //     },
        //     dataType: 'json',
        // });
        // parallel GET detail
        // const newsList = await Promise.all(
        //     Object.keys(idList).map(key => {
        //         const url = `${serverUrl}/item/${idList[key]}.json`;
        //         return this.ctx.curl(url, { dataType: 'json' });
        //     })
        // );
        // return newsList.map(res => res.data);

        const dataList = {
            list: [
                { id: 1,time:new Date(), title: 'this is news 12212121', url: '/news/1' },
                { id: 2, time: new Date('2019/03/12'), title: 'this is news 2', url: '/news/2' }
            ]
        };
        return new Promise(_=>{
            setTimeout(()=>{
                _(dataList)
            }, 2000)
        })
    }
}

module.exports = NewsService;
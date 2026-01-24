/**
 * @file 简历
 * http://localhost:3000/resume/20240416
 */
import styled from '@emotion/styled'
import avatar from '../imgs/2.jpg'
import { useEffect, useRef } from 'react'

const GlobalStyle = `
  * {
    font-variant-numeric: tabular-nums;
    font-family: PingFang SC;
    line-height: 1.5;
    box-sizing: border-box;
  }
  /** css overide start */
  .rp-doc.rp-doc.rp-doc {
    *{
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, h4, h5, h6, li {
      margin: .3em 0;
    }
    h2:first-of-type:before {
      display: none;
    }
    h3 {
      font-size: 16px;
    }
    h4 {
      font-size: 14px;
    }
    li {
      list-style-type: none;
    }
  }
  /** css overide end */
  .rspress-sidebar,
  .rspress-sidebar-menu,
  .rspress-doc-footer,
  .rspress-nav {
    display: none;
  }
`
export const Resume2024 = () => {
  const originTitle = useRef<string>()
  useEffect(() => {
    originTitle.current = document.title
    setTimeout(() => {
      document.title = '李祺丰-前端-8年-简历'
    }, 0)
    return () => {
      document.title = originTitle.current
    }
  }, [])
  return (
    <Wrapper>
      <style>{GlobalStyle}</style>
      <Main>
        <BasicInfo>
          <div>
            <div>前端开发工程师</div>
            <div>工作经验 8 年</div>
          </div>
          <div>
            <div>生日：1991.09.27</div>
            <div>学历：本科</div>
            <div>
              博客：
              <a target="_blank" href="https://qiphon.blog.csdn.net/">
                https://qiphon.blog.csdn.net/
              </a>
            </div>
            <div>
              github：
              <a target="_blank" href="https://github.com/qiphon/">
                https://github.com/qiphon/
              </a>
            </div>
          </div>
        </BasicInfo>
        <BlockSection>
          <h2>专业技能</h2>
          <ul>
            <li>
              &#10168; 掌握 HTML5 、CSS3 、ES5 、ES6+ 、jQuery 、Zepto
              、TypeScript
            </li>
            <li>
              &#10168; 掌握 React Native、Electron、Quasar、Uniapp、React
              Hooks、Vue2、Vue3、Mobx、Vuex、Pinia、Redux、React
              Query、micro-app、Dumi
            </li>
            <li>
              &#10168; 掌握 Less 、Sass 、Styled Component
              、CSSNEXT、tailwind、unocss
            </li>
            <li>&#10168; 掌握 Echarts 、Highcharts 、ImageEditor、antv G6</li>
            <li>&#10168; 掌握微信小程序 、公众号开发</li>
            <li>
              &#10168; 掌握 WEB 调试
              、抓包调试、jest、vitest、playwright、puppeteer
            </li>
            <li>&#10168; 掌握 Git 与 SVN</li>
            <li>&#10168; 掌握 Webpack 、Parcel 、Vite、ESLint</li>
            <li>
              &#10168; 熟悉 Linux (Fedora、Ubuntu、CentOS)、HTTP 、Nginx
              、Apache
            </li>
            <li>&#10168; 熟悉 Photoshop 、Fireworks 、Sketch</li>
            <li>&#10168; 了解 node 框架 pm2、Koa2 、Express 、hapi</li>
            <li>&#10168; 了解 Python、flutter、PHP 使用过 dedecms、phpcms</li>
            <li>&#10168; 了解 Jenkins 、Travis、github actions、gitlab ci</li>
          </ul>
        </BlockSection>

        <BlockSection>
          <h2>个人总结</h2>
          8年前端开发经验，3 年组长经验，5年TS经验，掌握
          nuxtjs、vue3、react、vue2、react-native、uniapp、electron、Cordova；使用过图形库Echarts、HighCharts、antv
          G2
          G6、ImageEditor，开发过很多微信小程序，微信SDK项目，node写过多语言提取脚本，配置过基于gitlab
          CI 和 nginx 的前端发布流程、githubActions，1年fedora linux环境开发经验
        </BlockSection>
      </Main>
    </Wrapper>
  )
}

const BlockSection = styled.section`
  font-size: 13px;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
    border-bottom: 1px solid #000;
  }
  h3,
  h2,
  h4 {
    font-weight: 500;
    margin-top: 8px;
  }
`

const Avatar = styled.img`
  display: block;
  width: 80px;
`

const BasicInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Main = styled.main`
  /* 根据生成的 pdf 宽度需要动态调整这里 */
  max-width: 780px;
  border: none;
`

const Wrapper = styled.div``

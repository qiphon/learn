/**
 * @file 简历
 */
import { styled, createGlobalStyle } from 'styled-components'

export const Resume2024 = () => {
  return (
    <Wrapper>
      打印测试
      <GlobalStyle />
      <Main>
        <BlockSection>
          <h2>专业技能</h2>
          <ul>
            <li>
              &#10168; 掌握 HTML5 、CSS3 、ES5 、ES6+ 、jQuery 、Zepto
              、TypeScript
            </li>
            <li>
              &#10168; 掌握 React、React
              Hooks、Vue2、Vue3、Mobx、Vuex、Pinia、Redux、React Query
            </li>
            <li>&#10168; 掌握 Less 、Sass 、Styled Component 、CSSNEXT</li>
            <li>&#10168; 掌握 Echarts 、Highcharts 、ImageEditor、antv G6</li>
            <li>&#10168; 掌握微信小程序 、公众号开发</li>
            <li>&#10168; 掌握 WEB 调试 、抓包调试</li>
            <li>&#10168; 掌握 Git 与 SVN</li>
            <li>&#10168; 掌握 Webpack 、Parcel 、Vite、ESLint</li>
            <li>
              &#10168; 熟悉 Linux (Fedora、Ubuntu、CentOS)、HTTP 、Nginx
              、Apache
            </li>
            <li>&#10168; 熟悉 Photoshop 、Fireworks 、Sketch</li>
            <li>&#10168; 了解 node 框架 pm2、Koa2 、Express 、hapi</li>
            <li>&#10168; 了解 PHP 使用过 dedecms、phpcms</li>
            <li>&#10168; 了解 Jenkins 、Travis、github actions、gitlab ci</li>
          </ul>
        </BlockSection>
      </Main>
    </Wrapper>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    font-variant-numeric: tabular-nums;
    font-family:PingFang SC ;
  }
  .rspress-sidebar,
  .rspress-sidebar-menu,
  .rspress-doc-footer,
  .rspress-nav
   {
    display:none;
  }
`

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
`

const Wrapper = styled.div``

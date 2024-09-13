/**
 * @file 简历
 * http://localhost:3000/resume/
 */
import { styled, createGlobalStyle } from 'styled-components'
import { useEffect, useRef } from 'react'

export const Resume2024 = () => {
  const originTitle = useRef<string>()
  useEffect(() => {
    originTitle.current = document.title
    return () => {
      document.title = originTitle.current
    }
  }, [])
  return (
    <Wrapper>
      <GlobalStyle />
      <Main>
        <BasicInfo>
          <div>
            <div>前端开发工程师</div>
            <div>工作经验 7 年</div>
          </div>
          <div>
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
              &#10168; 掌握 React Native、uniapp、React、React
              Hooks、Vue2、Vue3、Mobx、Vuex、Pinia、Redux、React Query
            </li>
            <li>&#10168; 掌握 Less 、Sass 、Styled Component 、CSSNEXT</li>
            <li>&#10168; 掌握 Echarts 、Highcharts 、ImageEditor、antv G6</li>
            <li>&#10168; 掌握微信小程序 、公众号开发</li>
            <li>&#10168; 掌握 WEB 调试 、抓包调试、jest</li>
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
          <h2>项目经历</h2>
          <div>
            <h3>&#10148;特斯拉北京</h3>
            <h4>tesla APP</h4>
            <strong>工作内容：</strong>
            主要负责销售活动、咨询落地页、问卷、奖券相关功能的迭代。同时补充了
            eslint 和 commitlint。技术：react native、styled-components
            <h4>销售运营平台 </h4>
            <strong>平台介绍：</strong>
            服务于销售及运营的一体化平台，提供面向客户的问卷、活动、卡券等内容管理，给M端、车机端、APP端、小程序端提供数据。
            <br />
            <strong>工作内容：</strong>项目之前是基于 umi3 + antd4 + react16.8 +
            react-router v5 开发，项目出海要求UI风格使用 TDS UI，因为 TDS UI
            及项目中的一些其它组件要求 react 版本为 18 ，react-router
            v6。由我来主导将项目中的 umi 去除，改用 webpack
            编译，同时所有的开发依赖升级到最新。并且补充 e2e
            测试用例保证代码的健壮。
            <h4>直播推流平台</h4>
            <strong>工作及平台介绍：</strong>
            该项目我主要负责，该平台面向公司所有销售，负责销售的直播预定及抖音、视频号、B站平台同时开播实现。
            <br />
            <strong>技术栈：</strong>umi 4、styled-components、TS、ahooks、TDS
            ui、antd-components 等<h3>&#10148;北京碳阻迹科技有限公司</h3>
            主要工作内容：
            <br />
            1.前端培训：带领团队成员从0TS基础到顺利使用TS开发，推荐成员使用第三方npm库如lodash、ahooks，给团队找合适的react、redux学习文章，辅助提升代码能力。招聘面试500+
            <br />
            2.UI组件开发、脚本工具开发：开发了小程序wxml多语言提取工具、扩展了第三方工具swaggie基础能力，根据团队特点写了特定的运行脚本，辅助完成自动化部署落地（从gitlabActions到Jenkins）
            <br />
            3.排期审核、质量控制、疑难问题处理、开发文档编写：根据成员在开发中的问题，整理了常见错误解决方式文档。编写了内部开发流程文档、成员学习计划文档、新人入职文档、开发工具类文档、项目管理文档等。
            <h4>SaaS碳管理平台及其管理平台、DCT交付产品平台等</h4>
            <strong>说明：</strong>
            公司主要的开发集中在自身的碳管理SaaS平台和交付类型的DCT标准化产品平台，SaaS项目使用webpack5编译、DCT使用vite编译；api接口使用swaggie脚本自动生成；使用内部table组件、formily提升开发效率；使用高德地图完成距离标注、打卡管理；eslint、TS、stylelint、commitlint控制代码质量，可视化使用Echarts、antv
            G6和ant design charts 完成。
            <br />
            <strong>技术：</strong>
            react、redux、TS、formily、xRender、axios、antv G6、Echarts、Ant
            Design
            Charts、Cryptojs、webpack5、eslint、stylelint、prettier、swaggie、vite、commit
            lint
            <h4>UI组件库(https://github.com/qiphon/cs-ui)</h4>
            <strong>说明：</strong>为提升开发效率而基于 antd、xrender
            封装的组件平台，根据使用频率，优先封装了表格、按钮等功能组件。
            <strong>技术：</strong>antd、TS、react、dumi
            <h4>碳账户小程序及多语言翻译方案、碳云小程序</h4>
            <strong>说明：</strong>
            前期的小程序均为原生开发，目前正在开始转为taro，为满足定制化客户的不同需求。功能设计微信支付、微信扫描、定位、授权、加密、海报等。
            <h4>碳阻迹官网 pm2 + nuxtjs</h4>
            <h3>&#10148;北京北大附中教育投资有限公司</h3>
            <h4>校务 Saas 服务平台 （Web 、iOS 、Android） 开发</h4>
            <strong>技术栈：</strong>ReactNative、React
            Hooks、Redux、Typescript、Antd、Antd Mobile、Echarts、React Query、
            Formily 、Fortawesome 、Styled Components 、Less
            开发工具：Flipper、Sentry、OpenAPI
            Generator、ESLint、StyleLint、Lerna、Jest、husky、 Shelljs
            、Prettire <br />
            <strong>项目介绍：</strong>该项目为满足学习工作需求而制作的
            Sass平台，让学校的数据可视化， 工作无纸化。项目基于 React 开发的
            Web、Mobile monorepo项目。使用 Lerna做 monorepo 管理， 业务组件基于
            Antd 、Antd-mobile 开发， 表单组件使用 Formily JSON Schema 开 发
            。使用 Eslint 、StyleLint 做代码规范监控 。接口使用 OpenAPI
            Generator 生成的 TS模板， 使用 React Query 做接口缓存 。使用 Sentry
            做项目的错误跟踪记录。
            <h3>&#10148;融泰浩元 （北京） 网络科技有限公司</h3>{' '}
            <h4>权限管理 SDK + 权限管理系统 </h4>
            <strong>技术栈：</strong>MutationObserver、CSSNEXT、Fetch、ESLint
            、Parcel 、Jenkins 项目介绍： 由于公司的管理系统存在着各种技术形式，
            单独做权限管理工作量太大， 由此需要开发全部统一的管理系统。
            技术实现：JSSDK 使用 Parcel 打包， 通过后台管理系统上传 OSS
            提高访问速度， SDK 使 用 es6 编写，使用 fetch 进行权限查询，使用
            MutationObserver 进行 DOM 监控，实现 DOM 删除， RegExp
            数据脱敏，管理系统 CSS Module 防止类名冲突，suspense + lazy
            做组件动态加载，使用 ESLint做代码规范检查
            <h4>
              其它项目还包含crm系统、问卷类动态表单、node
              快递面单脚本、微信公众号、微信小程序等
            </h4>
            <h3>&#10148;北京四海润元装饰有限公司</h3>
            职责：负责所有网络相关的事宜，2个官网的维护,开发了移动站。前端jQuery、Zepto、Bootstrap、LazyLoadjs、MediaQuery、百度jsApi；后端PHP、MySQL、CentOS
          </div>
        </BlockSection>
        <BlockSection>
          <h2>个人总结</h2>
          7年前端开发经验，3 年组长经验，4年TS经验，掌握
          nuxtjs、vue3、react、vue2、react-native、uniapp；使用过图形库Echarts、HighCharts、antv
          G2
          G6、ImageEditor，开发过很多微信小程序，微信SDK项目，node写过多语言提取脚本，配置过基于gitlab
          CI 和 nginx 的前端发布流程、githubActions，1年fedora linux环境开发经验
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

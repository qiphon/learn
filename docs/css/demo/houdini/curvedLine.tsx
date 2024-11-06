import { useEffect } from 'react'
import style from './curvedLine.module.less'

export const CurvedLine = () => {
  useEffect(() => {
    console.dir(CSS?.paintWorklet?.addModule)
    if ('paintWorklet' in CSS) {
      window.CSS.paintWorklet.addModule(
        'https://unpkg.com/curved-line@1.0.0/curved-line.js',
      )
    }
  }, [])
  return (
    <main className={style.main}>
      <h1>CurvedLine copy from https://houdini.how/#</h1>
      <p>
        The future of CSS is getting exciting with the arrival of
        <strong>CSS Houdini</strong>. Using its <strong>Paint API</strong>, we
        can create our custom style implementation.
      </p>
      <hr />
      <p>
        The browser supports for <strong>Paint API</strong> is also getting
        better, and with a polyfill, we can support out more browsers.
      </p>
      <p>
        <strong>CurvedLine (curved-line)</strong> is a CSS Houdini
        implementation to create a custom horizontal line.
      </p>
      <h2>You can customize it!</h2>
      <p>
        With the help of CSS properties, you can change the shape of the
        horizontal line.
      </p>
      <p>For example, you can make it dark blue, and more curved:</p>
      <hr className={style['custom-line-1']} />
      <p>
        or, you reduced the curved size, make it to bright pink, and shorten the
        interval:
      </p>
      <hr className={style['custom-line-2']} />
      <p>
        or, you can also shorten more the interval to make a diffferent feel
        with the line:
      </p>
      <hr className={style['custom-line-3']} />
      <p>Further reading:</p>
      <ul>
        <li>
          <a href="https://codepen.io/hazmi/pen/VwKreoq">
            See this demo on Codepen
          </a>
        </li>
        <li>
          <a href="https://codepen.io/hazmi/pen/poEdNPr">
            See more examples on Codepen
          </a>
        </li>
        <li>
          <a href="https://github.com/hazmi/curved-line">
            CurvedLine Github repository
          </a>
        </li>
        <li>
          <a href="https://houdini.how/">
            See more information about CSS Houdini
          </a>
        </li>
      </ul>
    </main>
  )
}

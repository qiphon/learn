import { useState } from 'react'
import { styled } from 'styled-components'

const Head = styled.h3`
  padding: 16px;
`

const Wrapper = styled.div<{ anchorValue: string }>`
  padding: 5px;
  width: 300px;
  aspect-ratio: 1;
  border: solid red 2px;
  overflow: scroll;
  overflow-anchor: ${props => props.anchorValue};

  button {
    border: 1px solid red;
    margin: 8px;
  }

  .blue {
    background-color: lightblue;
    height: 20px;
    width: 80%;
    animation: contentExpand 5s infinite;
  }

  .greenDiv {
    background-color: lightgreen;
    width: 80%;
    margin: 3px;
    aspect-ratio: 4/1;
  }
`

export const OverflowAnchor = () => {
  const [anchor, setanchor] = useState('none')
  let newBoxesDiv = document.querySelector('#newBoxes')
  function addBox() {
    let newDiv = document.createElement('div')
    newDiv.className = 'greenDiv'
    newBoxesDiv.appendChild(newDiv)
  }
  function cleanup() {
    // debugger
    console.log('remove added')
    newBoxesDiv.innerHTML = 'empty'
  }
  return (
    <div>
      <Head>
        overflow-anchor value is __ {anchor}{' '}
        <button
          onClick={() => {
            setanchor(anchor === 'none' ? 'auto' : 'none')
          }}
        >
          click me Change overflow anchor value
        </button>{' '}
      </Head>
      <Wrapper anchorValue={anchor}>
        <h3>CSS overflow-anchor property value 'none'.</h3>
        <p>
          Scroll down, click the button, and see how the new boxes created above
          pushes the text down.
        </p>
        <p>
          Change 'overflow-anchor' property value to 'auto', click 'Run', scroll
          down, click button, and see how the text now keeps its place in view,
          even as new boxes are created above.
        </p>

        <div id="container">
          <div id="newBoxes"></div>
          <h4>Scroll down to button, then click it</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button onClick={() => addBox()}>Click me</button>
          <button onClick={() => cleanup()}>clean up</button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Wrapper>
    </div>
  )
}

import { styled } from 'styled-components'

export const ClipPath = () => {
  return (
    <Wrapper>
      <div
        style={{
          clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)',
          background: 'red',
          width: '200px',
          height: '200px',
        }}
      >
        clip path div <br />
        clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)',
      </div>
      <AnimateBox>clip 实现 border 运动动画</AnimateBox>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const AnimateBox = styled(Wrapper)`
  height: 200px;
  background: rgb(67, 63, 63);
  position: relative;
  margin: 20px 0;

  @keyframes borderMove {
    0%,
    100% {
      clip-path: inset(0 0 90% 0);
    }
    25% {
      clip-path: inset(0 90% 0 0);
    }
    50% {
      clip-path: inset(90% 0 0 0);
    }
    75% {
      clip-path: inset(0 0 0 90%);
    }
  }

  &:before,
  &:after {
    position: absolute;
    content: '';
    display: block;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border: 2px solid red;
    animation: borderMove 6s infinite linear;
  }
  &:after {
    animation: borderMove 6s infinite 3s linear;
  }
`

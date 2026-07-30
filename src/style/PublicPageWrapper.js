import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #ede7d9;

  > main {
    width: 100%;
    max-width: none;
    box-shadow: none;
  }

  @media (min-width: 640px) {
    min-height: 100vh;
    align-items: center;
    padding: 48px 16px;
    background: #1c1a17;

    > main {
      width: 100%;
      max-width: 390px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
    }
  }
`

export default Wrapper
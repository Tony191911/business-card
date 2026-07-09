import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  color: #1a2b3c;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    padding: 40px 0;
  }
`

export default Wrapper
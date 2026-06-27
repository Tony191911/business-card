import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  color: #1e293b;

  .public-page-container {
    position: relative;
    display: flex;
    min-height: 100vh;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    background: #ffffff;
  }

  .public-page-container.beige {
    background: #f5f3f0;
  }

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    padding: 40px 0;

    .public-page-container {
      min-height: 760px;
      max-width: 430px;
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
    }
  }
`

export default Wrapper
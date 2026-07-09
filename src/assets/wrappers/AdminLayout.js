import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  color: #1a2b3c;

  .admin-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 16rem;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid #e0e4e8;
    background: #ffffff;
    z-index: 40;
  }

  .admin-content {
    margin-left: 16rem;
    min-height: 100vh;
    background: #f8f9fa;
  }

  @media (max-width: 767px) {
    .admin-sidebar {
      display: none;
    }

    .admin-content {
      margin-left: 0;
    }
  }
`

export default Wrapper
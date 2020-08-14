import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #eaeaea;
  align-items: center;
  text-align: center;
  & a {
    font-weight: bold;
  }
  & a:hover {
    color: blue;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; Stockbets 2020. All rights reserved.</p>
      <p>
        Created by&nbsp;
        <a
          href="https://www.parchot.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Parchot
        </a>
      </p>
    </StyledFooter>
  )
}

export default Footer;

import styled from 'styled-components';
import Pagination from './Pagination';

const Footer = ({ amountContentPerPage, funcPagination, currentPageNumber }) => {
    return (
        <Wrapper>
            <Content>
                {
                    <Pagination amountContentPerPage={ amountContentPerPage }
                                funcPagination={ funcPagination }
                                currentPageNumber={ currentPageNumber }/>
                }
            </Content>
        </Wrapper>
    );
}

export default Footer;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;

  height: 100px;
  width: 100%;

  padding: 25px 130px 25px 130px;
`;
const Content = styled.div`

`;
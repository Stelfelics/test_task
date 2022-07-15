import styled from 'styled-components';

const Pagination = ({ amountContentPerPage, funcPagination, currentPageNumber }) => {

    const pageNumbers = [];
    for (let i = 1; i <= amountContentPerPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <PaginationList>
                {
                    pageNumbers.map(number => (
                        <PaginationElement key={ number }>
                            <PaginationElementLink
                                isActive={ number === currentPageNumber ? 1 : 0 }
                                href={ "#" + number } onClick={() => funcPagination(number)}>
                                { number }
                            </PaginationElementLink>
                        </PaginationElement>
                    ))
                }
            </PaginationList>
        </div>
    );
}

export default Pagination;

const PaginationList = styled.ul`
  > *:first-child {
    margin-left: 0;
  }
  > * {
    margin-left: 4px;
    display: inline;
  }
`;
const PaginationElement = styled.li`
  display: inline;
`;
const PaginationElementLink = styled.a`

  color: black;
  font-weight: 400;
  
  ${({ isActive }) => 
          isActive ? 
              `color: #208dfc; 
              font-weight: 600;` : null
  }
  
  font-size: 15px;
  padding: 5px;
  display: inline;
  text-decoration: none;
  outline: none;
  border: 0;
`;
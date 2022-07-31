import styled from 'styled-components';
import SVG_SearchIcon from '../images/search_icon.svg';

const RightSide = ({ processSearch, currentTab, setCurrentTab }) => {

    const handleKey = (input) => {

        const targetValue = input.target.value;
        if (input.charCode === 13) { // onKeyPress

            processSearch(targetValue);
        } else { // onChange

        }
    }

    return (
        <Wrapper>
            <Content>
                {
                    ((currentTab === "posts" || currentTab === "users") ?
                        (
                            <SearchInput onKeyPress={ handleKey } onChange={ handleKey } placeholder="Поиск"/>
                        )
                    : ((currentTab === "searchPost") ?
                        (
                            <ResetButton onClick={ () => setCurrentTab("posts") }>
                                Ко всем постам
                            </ResetButton>
                        )
                    :
                        (
                            <ResetButton onClick={ () => setCurrentTab("users") }>
                                Ко всем пользователям
                            </ResetButton>
                        )
                        ))
                }
            </Content>
        </Wrapper>
    );
}

export default RightSide;

const ResetButton = styled.button`
  border-radius: 10px;
  padding: 10px;
  width: 80%;
  outline: none;
  border: 1px solid #e7ecf2;
  font-size: 15px;

  color: #208dfc;
  background-color: white;

  cursor: pointer;

  :hover {
    background-color: rgb(250, 255, 226);
  }
`;

const SearchInput = styled.input`
  border-radius: 10px;
  border: 1px solid #e7ecf2;
  padding: 10px;
  width: 80%;
  outline: none;
  color: black;
  font-size: 15px;
  
  padding-left: 37px!important;

  background-color: white;
  background-repeat: no-repeat;
  background-position: center left 10px;
  background-image: url('${ SVG_SearchIcon }');
  background-size: 17px;
`;
const Wrapper = styled.div`
  width: 40%;
  height: 100%;
`;
const Content = styled.div`
  margin: 15px 130px 0 20px;
`;
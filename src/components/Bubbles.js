import styled, {css} from 'styled-components';

const PostBubble = (props) => {
    return (
        <Wrapper>
            <Content special={ 0 }>
                <Header>
                    { props.title }
                </Header>
                <Body special={ 0 }>
                    { props.body }
                </Body>
            </Content>
        </Wrapper>
    );
}
const PostSearchedBubble = (props) => {
    return (
        <Wrapper>
            <Content special={ 0 }>
                <Header>
                    { props.title }
                </Header>
                <Body special={ 0 }>
                    { props.body }
                </Body>
                <Footer>
                    Автор:
                    <AuthorText>
                        { props.author }
                    </AuthorText>
                </Footer>
            </Content>
        </Wrapper>
    );
}
const UserBubble = (props) => {
    return (
        <Wrapper>
            <Content special={ 0 }>
                <Header>
                    { props.name }
                </Header>
                <Body special={ 0 }>
                    { props.email }
                </Body>
            </Content>
        </Wrapper>
    );
}

const Separator = (props) => {
    return (
        <Wrapper>
            <Content special={ 1 }>
                <Body special={ 1 }>
                    { props.body }
                </Body>
            </Content>
        </Wrapper>
    );
}

const Comment = (props) => {
    return (
        <Wrapper>
            <Content special={ 0 }>
                <Header>
                    { props.email }
                </Header>
                <Body>
                    { props.body }
                </Body>
            </Content>
        </Wrapper>
    );
}

export {
    PostBubble,
    PostSearchedBubble,
    UserBubble,
    Separator,
    Comment,
};

const AuthorText = styled.span`
  color: #208dfc;
  margin-left: 4px;
`;
const Header = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 18px;
`;
const Body = styled.div`
  margin-top: 10px;
  ${ props =>
          props.special ? `
              margin-top: 0;
              font-weight: 500;
              font-size: 18px;
          ` : null
  }
`;
const Footer = styled.div`
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: block;
  
  width: 100%;
  height: 100%;
  
  text-decoration: none;
  color: black;
`;
const Content = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;

  ${({ special }) =>
          (special === 1) ? `
              background-color: transparent;
              padding: 0;
              cursor: auto;
              padding-top: 10px;
              cursor: default;` : null
  }

  :hover {
    ${({ special }) =>
            (special === 1) ? `
              background-color: transparent;
             ` : `background-color: rgb(250, 255, 226);`
    }
  }
`;
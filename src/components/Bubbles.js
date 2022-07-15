import styled from 'styled-components';

const PostBubble = (props) => {
    return (
        <Wrapper href={ props.href }>
            <Content>
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

const UserBubble = (props) => {
    return (
        <Wrapper href={ props.href }>
            <Content>
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
            <Content>
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

export { PostBubble, UserBubble, Separator, Comment };

const AuthorName = styled.span`
  color: #208dfc;
`;
const Header = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 18px;
`;
const Body = styled.div`
  margin-top: 10px;
  ${({ special }) =>
          special ? `
              margin-top: 0;
              font-weight: 500;
              font-size: 18px;
          ` : null
  }
`;
const Footer = styled.div`
  margin-top: 10px;
`;

const Wrapper = styled.a`
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
          special ? `
              background-color: transparent;
              padding: 0;
              cursor: auto;
              padding-top: 10px;
          ` : null
  }

  :hover {
    background-color: rgb(250, 255, 226);
  }
`;
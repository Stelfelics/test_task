import styled from 'styled-components';
import HeaderLogo from '../images/favicon.svg';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const tabsList = [
    {
        content: "Посты",
        href: "posts"
    },
    {
        content: "Пользователи",
        href: "users"
    }
];

const Tabs = ({ items, setCurrentTab }) => {

    const [active, setActive] = useState(0);
    const openTab = (e) => {

        const btnIndex = Number(e.target.dataset.index);
        setActive(btnIndex);
    }

    useEffect(() => {
        setCurrentTab((active === 0) ? "posts" : "users");
    }, [active, setCurrentTab, setActive]);

    return (
        <div>
            {
                items.map((n, i) => (
                    <FixedLink key={ i } to={ n.href }>
                        <TabItem
                            isActive={ i === active ? 1 : 0 }
                            onClick={ openTab }
                            data-index={ i }
                            key={ i }>
                            { n.content }
                        </TabItem>
                    </FixedLink>
                ))
            }
        </div>
    );
}

const Header = ({ setCurrentTab }) => {

    return (
        <Wrapper>
            <Content>
                <Logo>
                    <img src={ HeaderLogo } height="48" width="48" alt=""/>
                </Logo>
                <FixedLink to="/">
                    <LogoDescription>
                        logoipsum
                    </LogoDescription>
                </FixedLink>
                <Tabs items={ tabsList }
                      setCurrentTab={ setCurrentTab }/>
            </Content>
        </Wrapper>
    );
}

export default Header;

const FixedLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  
  height: 100px;
  width: 100%;
  
  padding: 25px 130px 25px 130px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  height: 50px;
  width: 100%;
`;
const Logo = styled.div`
  height: 48px;
  width: 48px;
`;
const LogoDescription = styled.div`
  color: #4a5568;
  font-weight: 900;
  font-size: 22px;
  margin-left: 10px;
`;

const TabItem = styled.div`

  display: inline-block;
  color: black;
  ${({ isActive }) =>
        isActive ? `color: #208dfc;` : null
  }
  
  font-size: 15px;
  margin-left: 30px;
  cursor: pointer;

  text-decoration: none!important;

  :hover {
    color: rgb(255, 141, 0);
  }
`;
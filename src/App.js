import './App.css';
import styled from 'styled-components';

import { useState } from 'react';

// ============= header
import Header from './components/Header';

// ============= center sides
import LeftSide from "./components/LeftSide";
import RightSide from './components/RightSide';

// ============= footer
import Footer from './components/Footer';
import { useFetch } from "./useFetch";

const App = () => {

    // ============================== current tab
    const [currentTab, setCurrentTab] = useState("posts");

    // ============================== show content loading spinner
    const [loading, setLoading] = useState(false);

    // ============================== fetch content
    const [fetchedContent, setFetchedContent] = useState([]);

    // ============================== pagination params
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [needAmountContentPerPage, setNeedAmountContentPerPage] = useState(5);

    // ============================== search
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    // ================ get content from server ================
    useFetch(setFetchedContent, currentTab, setLoading, {
        searchText,
        setSearchResult,
        setNeedAmountContentPerPage
    });

    const lastPaginationIndex = currentPageNumber * needAmountContentPerPage;
    const firstPaginationIndex = lastPaginationIndex - needAmountContentPerPage;
    const contentPerPage = (currentTab === "posts" || currentTab === "users") ?
        ({
            fetchedContent: fetchedContent.slice(firstPaginationIndex, lastPaginationIndex),
        }) :
        ({
            fetchedContent: [searchResult.slice(firstPaginationIndex, lastPaginationIndex)]
        });

    const paginateContent = (pageNumber) => setCurrentPageNumber(pageNumber);

    const lengthContentPerPage = (currentTab === "posts" || currentTab === "users") ? fetchedContent.length : searchResult.length;
    const amountContentPerPage = Math.ceil(lengthContentPerPage / needAmountContentPerPage);
    const currentPage = currentPageNumber;

    const processSearch = (text) => {

        setSearchText(text);
        setCurrentTab((currentTab === "posts") ? "searchPost" : "searchUser");
    }

    return (
        <AppRoot>
            <Header setCurrentTab={ setCurrentTab }
                    currentTab={ currentTab }/>
            <Wrapper>
                <LeftSide contentPerPage={ contentPerPage }
                          contentParams={{ loading, currentTab }}/>
                <RightSide processSearch={ processSearch }
                           currentTab={ currentTab }
                           setCurrentTab={ setCurrentTab }/>
            </Wrapper>
            <Footer amountContentPerPage={ amountContentPerPage }
                    funcPagination={ paginateContent }
                    currentPageNumber={ currentPage }
                    currentTab={ currentTab }/>
        </AppRoot>
    );
}

export default App;

const AppRoot = styled.div`
  position: relative;
  margin: 50px 0;
  
  height: 776px;
  width: 1280px;
  
  > * {
    display: flex;
  }
`;

const Wrapper = styled.div`
  padding: 100px 0;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
`;


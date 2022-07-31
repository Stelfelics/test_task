import styled from 'styled-components';
import { PostBubble, Separator, UserBubble, Comment, PostSearchedBubble } from "./Bubbles";
import Spinner from "./spinner";

import { Link } from "react-router-dom";

const LeftSide = ({ contentPerPage, contentParams }) => {

    const currentTab = contentParams.currentTab;
    const content = (currentTab === "posts" || currentTab === "users") ? contentPerPage.fetchedContent : contentPerPage.fetchedContent[0];

    const selectBubble = (bubbleParams, i) => {

        const bubbleType = bubbleParams.bubbleType;
        if (bubbleType === "post") {
            return (
                <FixedLink key={ i } to={ `/posts/${ bubbleParams.id }` }>
                    <PostBubble key={ i }
                                title={ bubbleParams.title }
                                body={ bubbleParams.body }/>
                </FixedLink>
            );
        } else if (bubbleType === "user") {
            return (
                <FixedLink key={ i } to={ `/users/${ bubbleParams.id }` }>
                    <UserBubble key={ i }
                                name={ bubbleParams.name }
                                email={ bubbleParams.email }/>
                </FixedLink>
            );
        } else if (bubbleType === "separator") {
            return (
                <Separator key={ i }
                           body={ bubbleParams.bubbleText }/>
            );
        } else if (bubbleType === "post__searched") {
            return (
                <FixedLink key={ i } to={ `/posts/${ bubbleParams.id }` }>
                    <PostSearchedBubble key={ i }
                                title={ bubbleParams.title }
                                body={ bubbleParams.body }
                                author={ bubbleParams.author }/>
                </FixedLink>
            );
        } else if (bubbleType === "user__searched") {
            return (
                <FixedLink key={ i } to={ `/users/${ bubbleParams.id }` }>
                    <UserBubble key={i}
                                name={ bubbleParams.name }
                                email={ bubbleParams.email }/>
                </FixedLink>
            );
        } else if (bubbleType === "comment") {
            return (
                <Comment key={i}
                            email={ bubbleParams.email }
                            body={ bubbleParams.body }/>
            );
        }
    }

    return (
        <Wrapper>
            {
                (contentParams.loading) ?
                    <Loading>
                        <Spinner/>
                    </Loading> :
                    (<Content>
                        {
                            content.map((params, i) => (
                                selectBubble(params, i)))
                        }
                    </Content>)
            }
        </Wrapper>
    );
}

export default LeftSide;

const FixedLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  font-size: 20px;

  margin-left: 130px;
`;
const Wrapper = styled.div`
  width: 60%;
  height: 100%;

  padding: 15px 0;

  position: relative;
`;
const Content = styled.div`
  margin: 0 20px 0 130px;

  > * {
    margin-bottom: 15px;
  }
  > *:last-child {
    margin-bottom: 0;!important;
  }
`;
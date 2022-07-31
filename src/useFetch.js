import { useEffect } from 'react';
import axios from 'axios';

export const useFetch = (setContent, currentTab, setLoading, params = {}) => {
    useEffect(() => {
        if (currentTab === "posts") {
            const getAllPosts = () => {

                setLoading(true); // =======================

                axios.get('https://jsonplaceholder.typicode.com/posts')
                    .then((response) => {

                        const allPosts = response.data;

                        for (let element in allPosts)
                            allPosts[element].bubbleType = "post";

                        setContent(allPosts);
                        setLoading(false); // =======================

                        params.setNeedAmountContentPerPage(4);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            getAllPosts();
        } else if (currentTab === "users") {

            setLoading(true); // =======================

            const getAllUsers = () => {
                axios.get('https://jsonplaceholder.typicode.com/users')
                    .then((response) => {

                        const allUsers = response.data;

                        for (let element in allUsers)
                            allUsers[element].bubbleType = "user";

                        setContent(allUsers);
                        setLoading(false); // =======================

                        params.setNeedAmountContentPerPage(6);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            getAllUsers();
        } else if (currentTab === "searchPost") {
            if (params) {

                const searchText = params.searchText;

                axios.get(`https://jsonplaceholder.typicode.com/posts`)
                    .then((responsePosts) => {

                        const searchedPost = responsePosts.data;

                        const filterArrayFunc = () => {
                            const filteredArray = [];
                            for (let item in searchedPost) {

                                const title = searchedPost[item].title;
                                const body = searchedPost[item].body;

                                if (title.indexOf(searchText) !== -1 || body.indexOf(searchText) !== -1)
                                    filteredArray.push(searchedPost[item]);
                            }

                            return filteredArray;
                        }
                        const filteredArray = filterArrayFunc();
                        const firstFoundPost = filteredArray[0];
                        if (firstFoundPost) {
                            const firstFoundPostUserId = firstFoundPost.userId;
                            const firstFoundPostId = firstFoundPost.id;

                            axios.get(`https://jsonplaceholder.typicode.com/users/${firstFoundPostUserId}`)
                                .then((responseUser) => {
                                    axios.get(`https://jsonplaceholder.typicode.com/comments`)
                                        .then((responseAllComments) => {
                                            let contentLength = 0;
                                            const allComments = responseAllComments.data;
                                            let outObj = [];

                                            const author = responseUser.data.email;
                                            firstFoundPost.author = author;

                                            firstFoundPost.bubbleType = "post__searched";

                                            for (let element in allComments)
                                                if (allComments[element].postId === firstFoundPostId)
                                                    ++contentLength;

                                            outObj.push(
                                                firstFoundPost,
                                                {
                                                    bubbleType: "separator",
                                                    bubbleText: `Комментарии: ${contentLength}`
                                                }
                                            );

                                            for (let element in allComments) {
                                                if (allComments[element].postId === firstFoundPostId) {
                                                    allComments[element].bubbleType = "comment";
                                                    outObj.push(allComments[element]);
                                                }
                                            }

                                            params.setSearchResult(outObj);
                                            setLoading(false); // =======================

                                            params.setNeedAmountContentPerPage(5);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                        // ============================================

                    }).catch((error) => {
                    console.log(error);
                });
            }
        } else if (currentTab === "searchUser") {

            if (params) {

                const searchText = params.searchText;

                axios.get(`https://jsonplaceholder.typicode.com/users`)
                    .then((responseUsers) => {

                        const searchedUsers = responseUsers.data;

                        const filterArrayFunc = () => {
                            const filteredArray = [];
                            for (let item in searchedUsers) {

                                const title = searchedUsers[item].name;
                                const body = searchedUsers[item].email;

                                if (title.indexOf(searchText) !== -1 || body.indexOf(searchText) !== -1)
                                    filteredArray.push(searchedUsers[item]);
                            }

                            return filteredArray;
                        }
                        const filteredArray = filterArrayFunc();
                        const firstFoundUser = filteredArray[0];
                        if (firstFoundUser) {

                            const firstFoundUserId = firstFoundUser.id;

                            axios.get(`https://jsonplaceholder.typicode.com/posts`)
                                .then((responseAllPosts) => {
                                    let contentLength = 0;
                                    const allPosts = responseAllPosts.data;
                                    let outObj = [];

                                    firstFoundUser.bubbleType = "user__searched";

                                    for (let element in allPosts)
                                        if (allPosts[element].userId === firstFoundUserId)
                                            ++contentLength;

                                    outObj.push(
                                        firstFoundUser,
                                        {
                                            bubbleType: "separator",
                                            bubbleText: `Посты пользователя: ${contentLength}`
                                        }
                                    );

                                    for (let element in allPosts) {
                                        if (allPosts[element].userId === firstFoundUserId) {
                                            allPosts[element].bubbleType = "post";
                                            outObj.push(allPosts[element]);
                                        }
                                    }

                                    params.setSearchResult(outObj);
                                    setLoading(false); // =======================

                                    params.setNeedAmountContentPerPage(5);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                        // ============================================

                    }).catch((error) => {
                    console.log(error);
                });
            }
        }

        setLoading(true); // ======================= simulate a 404 error

    }, [currentTab, setContent, setLoading]);
}
// =====================================================
// =====================================================

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

                        params.setNeedAmountContentPerPage(5);
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
                const id = +params.searchText;
                if (id) {
                    const getPost = () => {

                        setLoading(true); // =======================

                        axios.get(`https://jsonplaceholder.typicode.com/comments`)
                            .then((responseAllComments) => {

                                axios.get(`https://jsonplaceholder.typicode.com/posts/${ id }`)
                                    .then((responsePost) => {

                                        let contentLength = 0;
                                        const allComments = responseAllComments.data;
                                        const searchedPost = responsePost.data;
                                        let outObj = [];

                                        searchedPost.bubbleType = "post__searched";

                                        for (let element in allComments)
                                            if (allComments[element].postId === id)
                                                ++contentLength;

                                        outObj.push(
                                            searchedPost,
                                            {
                                                bubbleType: "separator",
                                                bubbleText: `Комментарии: ${ contentLength }`
                                            }
                                        );

                                        for (let element in allComments) {
                                            if (allComments[element].postId === id) {
                                                allComments[element].bubbleType = "comment";
                                                outObj.push(allComments[element]);
                                            }
                                        }

                                        params.setSearchResult(outObj);
                                        setLoading(false); // =======================

                                        params.setNeedAmountContentPerPage(6);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    getPost();
                } else {
                    setLoading(true); // ======================= simulate a 404 error
                }
            }
        } else if (currentTab === "searchUser") {
            if (params) {
                const id = +params.searchText;
                if (id) {
                    const getPost = () => {

                        setLoading(true); // =======================

                        axios.get(`https://jsonplaceholder.typicode.com/posts`)
                            .then((responseAllPosts) => {

                                axios.get(`https://jsonplaceholder.typicode.com/users/${ id }`)
                                    .then((responsePost) => {

                                        let contentLength = 0;
                                        const allPosts = responseAllPosts.data;
                                        const searchedPost = responsePost.data;
                                        let outObj = [];

                                        searchedPost.bubbleType = "user__searched";

                                        for (let element in allPosts)
                                            if (allPosts[element].userId === id)
                                                ++contentLength;

                                        outObj.push(
                                            searchedPost,
                                            {
                                                bubbleType: "separator",
                                                bubbleText: `Посты пользователя: ${ contentLength }`
                                            }
                                        );

                                        for (let element in allPosts) {
                                            if (allPosts[element].userId === id) {
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
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    getPost();
                } else {
                    setLoading(true); // ======================= simulate a 404 error
                }
            }
        }
    }, [currentTab, setContent, setLoading]);
}
// =====================================================
// =====================================================

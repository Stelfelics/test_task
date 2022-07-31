import { useParams } from "react-router-dom";

const SearchByClick = ({ contentPerPage, contentParams, setCurrentTab, route, setSearchText }) => {

    const urlParams = useParams(); // получает параметр:id
    const postId = urlParams.id;

    // setCurrentTab("searchPost");

    const content = (route === "posts" || route === "users") ? contentPerPage.fetchedContent : contentPerPage.fetchedContent[0];

    console.log(content);

    return (
        <div style={{ "display": "flex" }}>
        {
            content.map((params, i) => {
                return (
                    <div key={ i } style={{ "display": "flex", "margin": "8px" }}>
                        {
                            ((Number(params.id) === Number(postId)) ? setSearchText(params.title) : 0)
                        }
                    </div>
                );
            })
        }
        </div>
    );
}

export default SearchByClick;
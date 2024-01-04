import BlogItem from "../../shared/components/blog-item";
import Pagination from "../../shared/components/pagination";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { search } from "../../services/api";
import { useEffect, useState } from "react";

const BlogSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blog, setBlog] = useState([]);
    const [pages, setPages] = useState({});
    const page = searchParams.get("page") || 1;
    const keyword = searchParams.get("keyword") || "";
    const token = useSelector(({ account }) => account.token);
    useEffect(() => {
        if(token) {
            search({
                headers : {
                    token : `Bearer ${token}`
                },
                params : {
                    keyword,
                    page,
                    limit : 10
                }
            }).then(({data}) => {
                setBlog(data.data.docs);
                setPages(data.pages);
            });
        }
    },[page, token, keyword]);
    return (
        <>
            <hgroup className="mb20">
                <h1>Search Results</h1>
                <h2 className="lead">results were found for the search for <strong className="text-danger">{keyword}</strong></h2>
            </hgroup>
            <hr></hr>
            {
                blog.map((item) => {if(item) return  <BlogItem item={item}/>}
                )
            }
            <Pagination pages={pages}/>
        </>
    )
}

export default BlogSearch;
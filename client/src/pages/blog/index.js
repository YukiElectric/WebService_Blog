import BlogItem from "../../shared/components/blog-item";
import Pagination from "../../shared/components/pagination";
import { useSearchParams, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlogUser } from "../../services/api";

const Blog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blog, setBlog] = useState([]);
    const [pages, setPages] = useState({});
    const page = searchParams.get("page") || 1;
    const id = useParams().id;
    const token = useSelector(({ account }) => account.token);
    useEffect(() => {
        if(token) {
            getBlogUser(id, {
                headers : { 
                    token : `Bearer ${token}`
                },
                params : {
                    page : page,
                    limit : 10
                }
            }).then(({data}) => {
                setBlog(data.data.docs);
                setPages(data.pages);
            })
        }
    }, [id, page, token]);
    return (
        <>
            {
                blog.map((item) =>
                    <BlogItem item={item}/>
                )
            }
            <Pagination pages={pages}/>
        </>
    )
}

export default Blog;
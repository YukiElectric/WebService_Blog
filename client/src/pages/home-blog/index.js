import { useEffect, useState } from "react";
import BlogItem from "../../shared/components/blog-item";
import Pagination from "../../shared/components/pagination";
import { useSearchParams } from "react-router-dom";
import { getBlog } from "../../services/api";
import { useSelector } from "react-redux";

const HomeBlog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blog, setBlog] = useState([]);
    const [pages, setPages] = useState({});
    const page = searchParams.get("page") || 1;

    const token = useSelector(({ account }) => account.token);

    
    useEffect(() => {
        if(token) {
            getBlog({
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
    }, [page, token]);
    
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

export default HomeBlog;
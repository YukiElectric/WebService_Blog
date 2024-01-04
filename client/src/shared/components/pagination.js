import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({pages}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const  { pathname, search } = useLocation();

    const formatUrl = (page) => {
        if(searchParams.get("keyword")) return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
        return `${pathname}?page=${page}`;
    }

    return (
        <nav className="blog-nav nav nav-justified my-5">
            <Link className={`nav-link-prev nav-item nav-link rounded mx-3 no-change-hover ${pages.hasPrev?"":"d-none"}`} to={formatUrl(pages.currentPage-1)}>Previous<i className="arrow-prev fas fa-long-arrow-alt-left" /></Link>
            <Link className={`nav-link-next nav-item nav-link rounded no-change-hover ${pages.hasNext?"":"d-none"}`} to={formatUrl(pages.currentPage+1)}>Next<i className="arrow-next fas fa-long-arrow-alt-right" /></Link>
        </nav>
    )
}

export default Pagination;
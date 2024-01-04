import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const onClickSubmit = (e) => {
        e.preventDefault();
        navigate(`/home/search?keyword=${search}`);
        setSearch("");
    }
    return (
        <section className="cta-section theme-bg-light py-5">
            <div className="container text-center">
                <form method="GET" className="signup-form form-inline justify-content-center pt-3">
                    <div className="form-group">
                        <input type="search" onChange={(e)=> setSearch(e.target.value)} className="form-control mr-md-1 semail" placeholder="Nhập blog cần tìm" value={search || ""}/>
                    </div>
                    <button onClick={onClickSubmit} type="submit" className="btn btn-primary">Tìm kiếm</button>
                </form>
            </div>
        </section>
    )
}

export default Search;
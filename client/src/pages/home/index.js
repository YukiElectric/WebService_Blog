import Header from "../../shared/components/layout/header";
import Search from "../../shared/components/layout/search";
import { Routes, Route } from "react-router-dom";
import BlogSearch from "../search";
import Blog from "../blog";
import HomeBlog from "../home-blog";
import BlogDetail from "../blog-detail";

const Home = () => {

    return (
        <div>
            <Header />
            <div className="main-wrapper">
                <Search />
                <section className="blog-list px-3 py-5 p-md-5">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<HomeBlog />} />
                            <Route path="search" element={<BlogSearch />} />
                            <Route path="blog/:id" element={<Blog />} />
                            <Route path="detail/:id" element={<BlogDetail/>} />
                        </Routes>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;
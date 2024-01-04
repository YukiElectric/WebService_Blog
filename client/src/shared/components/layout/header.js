import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CreateBlog from "../modals/create-blog";

const Header = () => {
    const [current, setCurrent] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const data = useSelector(({ account }) => {
        return account;
    });

    if (JSON.stringify(data) == "{}") navigate("/");

    const removeAccount = () => {
        dispatch({
            type: "DELETE_ACCOUNT",
        });
        navigate("/");
    }

    return (
        <header className="header text-center">
            <h1 className="blog-name pt-lg-4 mb-0"><Link onClick={() => setCurrent(false)} to={`/home/blog/${data.id}`}>{data.name}</Link></h1>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div id="navigation" className="collapse navbar-collapse flex-column">
                    <div className="profile-section pt-3 pt-lg-0">
                        <img className="profile-image mb-3 rounded-circle mx-auto" src={data.picture} alt="image" />
                        <hr />
                    </div>
                    <ul className="navbar-nav flex-column text-left">
                        <li className={`nav-item ${current ? "active" : ""}`}>
                            <Link className="nav-link" onClick={() => setCurrent(true)} to="/home"><i className="fas fa-home fa-fw mr-2" />Trang chủ </Link>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link cursor" onClick={() => setShow(true)}><i class="fas fa-bookmark fa-fw mr-2"></i>Tạo blog</a>
                        </li>
                        <li className={`nav-item ${!current ? "active" : ""}`}>
                            <Link className="nav-link" onClick={() => setCurrent(false)} to={`/home/blog/${data.id}`}><i className="fas fa-user fa-fw mr-2" />Trang cá nhân <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <div className="my-2 my-md-3">
                        <button onClick={removeAccount} className="btn btn-primary" target="_blank">Đăng xuất</button>
                    </div>
                </div>
            </nav>
            <CreateBlog show={show}
                handleClose={handleClose}
                initHeader={""}
                initContent={""}
                post={true}
            />
        </header>
    )
}

export default Header;
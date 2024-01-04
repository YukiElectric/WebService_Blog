import Comment from "./comment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogDetail, deleteBlog } from "../../services/api";
import moment from "moment";
import { Parser } from "html-to-react";
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import CreateBlog from "../../shared/components/modals/create-blog";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const BlogDetail = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const [comment, setComment] = useState();
    const account = useSelector(({ account }) => account);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    useEffect(() => {
        if (account.token) {
            getBlogDetail(id, {
                headers: {
                    token: `Bearer ${account.token}`
                }
            }).then(({ data }) => {
                setBlog(data.data.blog);
                setComment(data.data.comments);
            })
        }
    }, [account.token, id]);

    const resizeImage = (content) => {
        const defaultImage = 700;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const images = doc.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const currentWidth = image.getAttribute("width");
            const currentHeight = image.getAttribute("height");
            if (currentWidth < defaultImage && currentHeight < defaultImage) continue;
            const rad = currentWidth / currentHeight;
            image.setAttribute("width", rad * defaultImage);
            image.setAttribute("height", defaultImage);
        }

        const body = doc.body.innerHTML;
        return new Parser().parse(body);
    }

    const remove = () => {
        deleteBlog(id, {
            headers: {
                token: `Bearer ${account.token}`
            }
        }).then(({ data }) => {
            if (data.status == "Success") {
                navigate("/home");
            }
        })
    }

    const submit = () => {
        confirmAlert({
            title: 'Xóa bài viết',
            message: 'Bạn có chắc chắn muốn xóa bài viết',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: remove
                },
                {
                    label: 'Thôi',
                }
            ]
        });
    };

    return (
        <>
            <article className="blog-post px-3 py-5 p-md-5">
                <div className="container">
                    <header className="blog-post-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-row align-items-center">
                                <h2 className="title mb-2">{blog.header}</h2>
                            </div>
                            {
                                account.id == blog.user_id
                                &&
                                <small className="cursor">
                                    <Menu menuButton={<button className="icon"><i className="fa fa-ellipsis-v" /></button>} transition>
                                        <MenuItem onClick={submit}>Xóa</MenuItem>
                                        <MenuItem onClick={() => setShow(true)}>Chỉnh sửa</MenuItem>
                                    </Menu>
                                </small>
                            }
                        </div>
                        <div className="meta mb-3">
                            <span className="date">Published {moment(new Date(blog.createdAt)).fromNow()}</span>
                            <span className="comment">
                                <a>{comment} comments</a>
                            </span>
                        </div>
                    </header>
                    <div className="blog-post-body resize-image">
                        {
                            resizeImage(blog.content)
                        }
                    </div>
                </div>
            </article>
            <Comment canDelete={account.id == blog.user_id} />
            <CreateBlog show={show}
                handleClose={handleClose}
                initHeader={blog.header}
                initContent={blog.content}
                post={false}
            />
        </>
    )
}

export default BlogDetail;
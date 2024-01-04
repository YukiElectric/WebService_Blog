import { useEffect, useState } from 'react';
import Pagination from '../../shared/components/pagination';
import './style.css';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Button } from 'react-bootstrap';
import { getComment, updateComment, createComment, deleteComment } from '../../services/api';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Comment = ({ canDelete }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = useParams().id;
    const [pages, setPages] = useState({});
    const page = searchParams.get('page') || 1;
    const [edit, setEdit] = useState([]);
    const [comment, setComment] = useState([]);
    const [inputComment, setInputComment] = useState();
    const [newComment, setNewComment] = useState("");

    const emailData = useSelector(({ account }) => {
        return account;
    });

    const getDataComment = () => {
        getComment(id, {
            headers: {
                token: `Bearer ${emailData.token}`
            },
            params : {
                page,
                limit : 10
            }
        }).then(({ data }) => {
            setComment(data.data.docs);
            setPages(data.pages);
            setEdit(Array(comment.length).fill(false));
        })
    }

    const postComment = () => {
        const content = inputComment;
        createComment(id, {content}, {
            headers: {
                token: `Bearer ${emailData.token}`
            }
        }).then(({data}) => {
            if(data.status == "Success") {
                getDataComment();
            }
        })
    }

    const updateCommentData = (id) => {
        const content = newComment;
        updateComment(id, {content}, {
            headers: {
                token: `Bearer ${emailData.token}`
            }
        }).then(({data}) => {
            if(data.status == "Success") {
                getDataComment();
            }
        })
    }

    const deleteCommentData = (id) => {
        deleteComment(id, {
            headers: {
                token: `Bearer ${emailData.token}`
            }
        }).then(({data}) => {
            if(data.status == "Success") {
                getDataComment();
            }
        })
    }

    useEffect(() => {
        if (emailData.token) {
            getDataComment();
        }
    }, [page, id, emailData.token]);

    const onChangeComment = (e) => {
        if (e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setInputComment("");
            postComment();
        }
    }

    const changeEdit = (index, value) => {
        const newArray = [...edit];
        newArray[index] = value;
        setEdit(newArray);
    }

    const submit = (id) => {
        confirmAlert({
            title: 'Xóa bình luận',
            message: 'Bạn có chắc chắn muốn xóa bình luận này',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick : () => deleteCommentData(id)
                },
                {
                    label: 'Thôi',
                }
            ]
        });
    };

    return (
        <>
            <div className="mt-5 mb-5">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="p-3">
                                <h6>Comments</h6>
                            </div>
                            <div className="mt-3 d-flex flex-row align-items-center p-3 form-color"> <img src={emailData.picture} width={50} className="rounded-circle mr-2" />
                                <TextareaAutosize onChange={(e) => setInputComment(e.target.value)} onKeyDown={onChangeComment} className="form-control" placeholder="Enter your comment..." value={inputComment || ""} />
                            </div>
                            <div className="mt-2">
                                {
                                    comment.map((item, index) =>
                                        <div className="d-flex flex-row p-3">
                                            <img src={item.user_id.email_picture} width={40} height={40} className="rounded-circle mr-3" />
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <h5 className="mr-2">
                                                            {item.user_id.email_name}
                                                        </h5>
                                                    </div>
                                                    {
                                                        (canDelete || item.user_id._id == emailData.id) &&
                                                        <small className="cursor">
                                                            <Menu menuButton={<button className="icon"><i className="fa fa-ellipsis-v" /></button>} transition>
                                                                <MenuItem onClick={() => submit(item._id)}>Xóa</MenuItem>
                                                                {
                                                                    item.user_id._id == emailData.id &&
                                                                    <MenuItem onClick={() => {changeEdit(index, true); setNewComment(item.content)}}>Chỉnh sửa</MenuItem>
                                                                }
                                                            </Menu>
                                                        </small>
                                                    }
                                                </div>
                                                {
                                                    !edit[index] ?
                                                        <p className="text-justify comment-text mb-0">{item.content}</p>
                                                        :
                                                        <>
                                                            <TextareaAutosize onChange={(e) => setNewComment(e.target.value)} name="content" className="form-control" placeholder="Enter your comment..." value={newComment} />
                                                            <div className="mt-2 ml-3">
                                                                <Button onClick={() => {changeEdit(index, false); updateCommentData(item._id)}} variant="success" className="mr-2">Xác nhận</Button>
                                                                <Button onClick={() => { changeEdit(index, false); setNewComment(item.user_id.content) }}>Cancel</Button>
                                                            </div>
                                                        </>
                                                }
                                                <div className="d-flex flex-row user-feed"><p className="mr-3">{moment(new Date(item.createdAt)).fromNow()}</p><span className="cursor"><i className="fa fa-reply mr-2" />Reply</span></div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination pages={pages} />
        </>
    )
}

export default Comment;
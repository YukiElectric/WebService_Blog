import { Modal, Button } from "react-bootstrap"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBlog, updateBlog } from "../../../services/api";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CreateBlog = ({ show, handleClose, initHeader, initContent, post }) => {
    const {pathname, search} = useLocation();
    const id = useParams().id;
    const [header, setHeader] = useState(initHeader);
    const [content, setContent] = useState(initContent);
    const emailData = useSelector(({ account }) => {
        return account;
    });
    const navigate = useNavigate();

    const createPost = (e) => {
        e.preventDefault();
        if(post) {
            createBlog({header, content}, {
                headers : {
                    token : `Bearer ${emailData.token}`
                }
            }).then(({data}) => {
                if(data.status == "Success") {
                    setContent("");
                    setHeader("");
                    handleClose();
                    navigate("/sucess");
                    navigate("/home");
                }
            })
        }else {
            updateBlog(id,{header, content}, {
                headers : {
                    token : `Bearer ${emailData.token}`
                }
            }).then(({data})=>{
                if(data.status == "Success") {
                    setContent("");
                    setHeader("");
                    handleClose();
                    navigate("/sucess");
                    navigate(pathname);
                }
            })
        }
    }

    useEffect(() => {
        setContent(initContent);
        setHeader(initHeader);
    }, [initHeader, initContent])

    const config = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'T',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'blockQuote', 'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                'alignment',
                'code',
                'codeBlock',
                'findAndReplace',
                'fontColor',
                'fontFamily',
                'fontSize',
                'fontBackgroundColor',
                'highlight',
                'horizontalLine',
                'htmlEmbed',
                'imageInsert'
            ]
        },
        Language: 'vi',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'imageResize'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn đang nghĩ gì</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-group">
                        <h4>Tiêu đề</h4>
                        <TextareaAutosize onChange={(e) => setHeader(e.target.value)} class="form-control" placeholder="Nhập tiêu đề" required value={header || ""} />
                    </div>
                    <CKEditor
                        editor={Editor}
                        config={config}
                        data={content || ""}
                        onChange={(event, editor) => {
                            setContent(editor.getData())
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={createPost}>
                        Đăng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateBlog;
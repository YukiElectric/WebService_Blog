import { Link } from "react-router-dom";
import moment from "moment";

const BlogItem = ({item}) => {
    return (
        <div className="item mb-5">
            <div className="media">
                <div className="media-body">
                    <div className="d-flex align-items-center">
                        <img className="mr-1 img-fluid post-thumb d-none d-md-flex rounded-circle w-0.5" src={item.user_id.email_picture} alt="image" />
                        <Link to={`/home/blog/${item.user_id._id}`}>{item.user_id.email_name}</Link>
                    </div>
                    <h3 className="title mb-1"><Link to={`/home/detail/${item._id}`}>{item.header}</Link></h3>
                    <div className="meta mb-1"><span className="date">Published {moment(new Date(item.createdAt)).fromNow()}</span></div>
                    <div className="intro">{item.content}</div>
                    <Link className="more-link" to={`/home/detail/${item._id}`}>Read more →</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogItem;
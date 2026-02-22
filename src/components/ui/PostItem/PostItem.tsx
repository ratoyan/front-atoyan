import {type FC} from "react";

// types
import type {Post} from "../../../types/post";

// styles
import "./PostItem.css";

interface PostItemProps {
    post: Post;
}

const PostItem: FC<PostItemProps> = ({post}) => {
    return (
        <article className="postItem">
            <img
                src={post.img_2x}
                alt={post.title}
                className="postItemImage"
                fetchPriority={'high'}
                srcSet={`
                    ${post.img} 768w,
                    ${post.img_2x} 1600w
                `}
                decoding="async"
                width={360}
                height={231}
                sizes="360px"
            />

            <span className="postItemTag">{post.tags}</span>

            <h2 className="postItemTitle">{post.title}</h2>

            <div className="postItemMeta">
                <span className="postItemAuthor">{post.autor}</span>
                <span className="postItemDate">{post.date}</span>
                <span className="postItemViews">{post.views} Views</span>
            </div>

            <p className="postItemText">{post.text}</p>
        </article>
    );
};

export default PostItem;

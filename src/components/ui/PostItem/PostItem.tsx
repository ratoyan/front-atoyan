import {type FC, useState} from "react";

// types
import type {Post} from "../../../types/post";

// styles
import "./PostItem.css";

interface PostItemProps {
    post: Post;
}

const PostItem: FC<PostItemProps> = ({post}) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    return (
        <article className="postItem">
            {!loaded && !error && <div className="imageSkeleton" />}

            <img
                src={post.img}
                alt={post.title}
                className="postItemImage"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
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

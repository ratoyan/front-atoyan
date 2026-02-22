import { type FC } from "react";

// types
import type { Post } from "../../../types/post";

// styles
import './PostModal.css';

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, post }) => {
    if (!isOpen || !post) return null;

    return (
        <div className="postModalBackdrop" onClick={onClose}>
            <div
                className="postModal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="closeBtn" onClick={onClose}>
                    ✖
                </button>

                <span className="postModalItemTag">{post.tags}</span>

                <h2 className="postModalItemTitle">{post.title}</h2>

                <div className="postModalItemMeta">
                    <span className="postModalItemAuthor">{post.autor}</span>
                    <span className="postModalItemDate">{post.date}</span>
                    <span className="postModalItemViews">{post.views} Views</span>
                </div>

                {post.img && (
                    <img
                        src={post.img}
                        alt={post.title}
                        className="postModalItemImage"
                    />
                )}

                <p className="postModalItemText">{post.text}</p>
            </div>
        </div>
    );
};

export default PostModal;

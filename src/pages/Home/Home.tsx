import {type FC, useEffect, useMemo, useState} from "react";

// images
import EmptySearch from "../../assets/images/emptySearch.svg";

// types
import type {Post} from "../../types/post";

// api
import {postsApi} from "../../services/api/posts.api";

// components
import Header from "../../components/layout/Header/Header";
import PostItem from "../../components/ui/PostItem/PostItem";

// styles
import "./Home.css";
import "../../style/global.css";

const Home: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const posts = await postsApi();
                setAllPosts(posts ?? []);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(`Failed to load posts: ${err.message}`);
                } else {
                    setError("Failed to load posts");
                }
                setAllPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (!search.trim()) return allPosts;

        const query = search.toLowerCase();
        return allPosts.filter((post) =>
            post.title.toLowerCase().includes(query)
        );
    }, [search, allPosts]);

    return (
        <div className="page">
            <Header search={search} setSearch={setSearch}/>

            <div className="posts container">
                {isLoading ? (
                    <p className="loading">Loading posts...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post: Post, index) => (
                        <PostItem post={post} key={index}/>
                    ))
                ) : (
                    <img
                        src={EmptySearch}
                        alt="No posts found"
                        className="emptyImage"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;

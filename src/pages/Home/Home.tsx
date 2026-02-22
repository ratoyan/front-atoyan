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
import PostModal from "../../components/ui/PostModal/PostModal.tsx";

// styles
import "./Home.css";
import "../../style/global.css";

const Home: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const posts: Post[] = await postsApi();
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

            <main className="posts container">
                {isLoading ? (
                    <p className="loading">Loading posts...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post: Post, index: number) => (
                        <PostItem post={post} key={index}
                                  onClick={(): void => {
                                      setSelectedPost(post);
                                      setIsModalOpen(true);
                                  }}
                        />
                    ))
                ) : (
                    <img
                        src={EmptySearch}
                        alt="No posts found"
                        className="emptyImage"
                    />
                )}
            </main>

            <PostModal
                isOpen={isModalOpen}
                post={selectedPost}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedPost(null);
                }}
            />
        </div>
    );
};

export default Home;

import {type FC, useEffect, useMemo, useState} from "react";

// images
import EmptySearch from '../../assets/images/emptySearch.svg';

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
    const [search, setSearch] = useState("");
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const resp = await postsApi();
                if (resp.data?.length) {
                    setAllPosts(resp.data);
                }
            } catch (error) {
                console.error("Failed to fetch posts", error);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (!search.trim()) return allPosts;

        return allPosts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, allPosts]);

    return (
        <div className='page'>
            <Header search={search} setSearch={setSearch}/>

            <div className="posts container">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post: Post, index: number) => (
                        <PostItem post={post} key={index}/>
                    ))
                ) : (
                    <img src={EmptySearch} alt={'empty'} className={'emptyImage'}/>
                )}
            </div>
        </div>
    );
};

export default Home;

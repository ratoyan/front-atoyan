import {type FC, useEffect, useState} from "react";

// types
import type {Post} from "../../types/post.ts";

// api
import {postsApi} from "../../services/api/posts.api.ts";

// components
import Header from "../../components/layout/Header/Header.tsx";
import PostItem from "../../components/ui/PostItem/PostItem.tsx";

// styles
import './Home.css';

const Home: FC = () => {
    const [search, setSearch] = useState<string>('');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const resp = await postsApi();
                if (resp.data?.length) {
                    setPosts(resp.data);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div style={{width: '99%'}}>
            <Header search={search} setSearch={setSearch}/>
            <div className={'posts container'}>
                {
                    posts?.length > 0 && posts.map((post: Post, index: number) => {
                        return (
                            <PostItem post={post} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;

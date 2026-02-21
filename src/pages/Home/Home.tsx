import {type FC, useState} from "react";
import Header from "../../components/layout/Header/Header.tsx";

const Home: FC = () => {
    const [search, setSearch] = useState<string>('');

    return (
        <div style={{width: '99%'}}>
            <Header search={search} setSearch={setSearch}/>
        </div>
    )
}

export default Home;

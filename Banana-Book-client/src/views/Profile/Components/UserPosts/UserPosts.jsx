import { useEffect, useState } from "react";
import axios from "axios";
import './UserPosts.css';

const UserPosts = () => {

    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const [posts, setPosts] = useState([]);

    const fetchProfile = async (token) => {
        const {data} = await axios.get(`${baseUrl}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        
        return data;
    };

    async function getPosts() {
        const token = localStorage.getItem('Banana_Book_key');
        
        const user = await fetchProfile(token);

        axios.get(`${baseUrl}/post/getByUser/${user._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="profile-feed">
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" />}
                    <div className="post-buttons">
                        <button className="sell">Vender</button>
                        <button className="edit">Editar</button>
                        <button className="delete">Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default UserPosts;
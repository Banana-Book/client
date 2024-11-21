import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPosts.css';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../../Components/Loading/LoadingScreen';
import { toast } from 'react-toastify';

const UserPosts = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (token) => {
    const { data } = await axios.get(`${baseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  async function getPosts() {
    const token = localStorage.getItem('Banana_Book_key');
    setLoading(true);
    const user = await fetchProfile(token);

    axios
      .get(`${baseUrl}/post/getByUser/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        toast.error('No se pudieron obtener los posts');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getPosts();
  }, []);

  async function deletePost(id) {
    const token = localStorage.getItem('Banana_Book_key');
    setLoading(true);

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este post?');
    if (!confirmDelete) return;

    axios
      .delete(`${baseUrl}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success('Post eliminado correctamente');
        getPosts();
      })
      .catch((err) => {
        toast.error('No se pudo eliminar el post');
      })
      .finally(() => setLoading(false));
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="profile-feed">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" />}
          <div className="post-buttons">
            {!post.hidden && (
              <button className="sell" onClick={() => navigate(`/product/${post._id}`)}>
                Vender
              </button>
            )}
            <button
              className="edit"
              onClick={() => {
                navigate(`/profile/editPost/${post._id}`);
              }}
            >
              Editar
            </button>
            <button
              className="delete"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;

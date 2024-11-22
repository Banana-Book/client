import './EditPost.css';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useConfigContext } from '../../contexts/ConfigContext';
import instance from '../../api/instance';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../Components/Loading/LoadingScreen';

const EditPost = () => {
  const [titleField, setTitle] = useState('');
  const [descriptionField, setDescription] = useState('');
  const [priceField, setPrice] = useState('');
  const [categoryField, setCategory] = useState('');
  const [conditionField, setCondition] = useState('');
  const [imageField, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { startLoading, stopLoading } = useConfigContext();
  const navigate = useNavigate();
  const { id } = useParams();

  async function getPost() {
    const token = localStorage.getItem('Banana_Book_key');
    setLoading(true);

    instance
      .get(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setCategory(res.data.category);
        setCondition(res.data.condition);
        setImage(res.data.image);
      })
      .catch((err) => {
        toast.error('Error al cargar el post');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getPost();
  }, []);

  const errors = {
    title: !titleField,
    description: !descriptionField || descriptionField.length > 280,
    price: !priceField,
    category: !categoryField,
    condition: !conditionField,
    image:
      imageField.length > 0 &&
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(imageField),
  };

  const hasErrors = () => {
    console.log(errors);
    return Object.values(errors).some((error) => error);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(titleField, descriptionField, priceField, categoryField, conditionField, imageField);

    onEditPostHandler(titleField, descriptionField, priceField, categoryField, conditionField, imageField);

    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setCondition('');
    setImage('');
    if (hasErrors()) {
      toast.warn('Your fields are wrong!');
      return;
    }
  };

  //Función para guardar un post en la API
  const editPost = async (title, description, price, category, condition, image) => {
    try {
      startLoading();

      await instance.patch(`/post/${id}`, { title, description, price, category, condition, image });
      toast.success('Post saved!');
      navigate(-1);
    } catch (error) {
      const { status } = error.response || { status: 500 };
      const msg = {
        400: 'Wrong fields',
        404: 'Not Found',
        500: 'Something went wrong!',
      };

      toast.error(msg[status.toString()] || 'Unexpected error!');
    } finally {
      stopLoading();
    }
  };

  //Handler de añadir posts
  const onEditPostHandler = async (title, description, price, category, condition, image) => {
    await editPost(title, description, price, category, condition, image);
  };

  if (loading) return <LoadingScreen />;

  return (
    <section className="edit-post">
      <form onSubmit={onSubmitHandler} className="editForm">
        <div className="editpostdiv">
          <div className="editInformation">
            <label>Titulo</label>
            <input
              name="title"
              type="text"
              className="editPost"
              value={titleField}
              placeholder="Titulo"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="editInformation">
            <label>Descripción</label>
            <input
              name="description"
              type="text"
              className="editPost"
              value={descriptionField}
              placeholder="Descripción"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="editInformation">
            <label>Precio</label>
            <input
              name="price"
              type="number"
              className="editPost"
              value={priceField}
              placeholder="Precio"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="editInformation">
            <label>Categoría</label>
            <select
              className="editPost thick-modal-main-select"
              placeholder="Categoria"
              value={categoryField}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option>Seleccione categoría</option>
              <option value="matematica">Matemática</option>
              <option value="fisica">Física</option>
              <option value="ciencias">Ciencias</option>
              <option value="programacion">Programación</option>
              <option value="idiomas">Idiomas</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="editInformation">
            <label>Condición</label>
            <select
              className="editPost thick-modal-main-select"
              placeholder="Condición"
              value={conditionField}
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            >
              <option>Seleccione condicion</option>
              <option value="como nuevo">Como nuevo</option>
              <option value="buena">Buena</option>
              <option value="mala">Mala</option>
            </select>
          </div>
          <div className="editImage">
            <p>Agregar Imagen</p>
            <input
              name="image"
              type="url"
              className="editPost"
              value={imageField}
              placeholder="URL de imagen de publicacion"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="EditInfo">
            <button type="submit" disabled={hasErrors()} className="editPost">
              Actualizar publicación
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditPost;

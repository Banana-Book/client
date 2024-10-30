import React from 'react';
import './NewPost.css';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { useConfigContext } from '../../contexts/ConfigContext';
import instance from '../../api/instance';

const NewPost = () => {
  const [titleField, setTitle] = useState('');
  const [descriptionField, setDescription] = useState('');
  const [priceField, setPrice] = useState('');
  const [categoryField, setCategory] = useState('');
  const [conditionField, setCondition] = useState('');
  const [imageField, setImage] = useState('');

  const { startLoading, stopLoading } = useConfigContext();

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
    return Object.values(errors).some((error) => error);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    onAddPostHandler(titleField, descriptionField, priceField, categoryField, conditionField, imageField);

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
  const savePost = async (title, description, price, category, condition, image) => {
    try {
      startLoading();

      /* await axios.post('/post', { title, description, price, category, condition, image }); */
      await instance.post('/post', { title, description, price, category, condition, image });
      toast.success('Post saved!');
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
  const onAddPostHandler = async (title, description, price, category, condition, image) => {
    await savePost(title, description, price, category, condition, image);
  };

  return (
    <section className="new-post">
      <form onSubmit={onSubmitHandler}>
        <div className="newpostdiv">
          <div className="addInformation">
            <input
              name="title"
              type="text"
              className="addPost"
              value={titleField}
              placeholder="Titulo"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="addInformation">
            <input
              name="description"
              type="text"
              className="addPost"
              value={descriptionField}
              placeholder="Descripción"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="addInformation">
            <input
              name="price"
              type="number"
              className="addPost"
              value={priceField}
              placeholder="Precio"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="addInformation">
            <input
              name="category"
              type="text"
              className="addPost"
              value={categoryField}
              placeholder="Categoria"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div className="addInformation">
            <input
              name="condition"
              type="text"
              className="addPost"
              value={conditionField}
              placeholder="Estado"
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            />
          </div>
          <div className="addImage">
            <p>Agregar Imagen</p>
            <input
              name="image"
              type="url"
              className="addPost"
              value={imageField}
              placeholder="URL de imagen de publicacion"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="PostInfo">
            <button type="submit" disabled={hasErrors()} className="addPost">
              Publicar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewPost;

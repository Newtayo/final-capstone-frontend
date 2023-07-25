import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLaptop, clear } from '../../redux/laptop/laptopSlice';

  const AddLaptop = () => {
    const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [price, setPrice] = useState('');
  const [romSize, setRomSize] = useState('');
  const [ramSize, setRamSize] = useState('');
  const [description, setDescription] = useState('');

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.laptops);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const postData = () => {
    const data = {
      name,
      photo_url: photoUrl,
      model_year: modelYear,
      price,
      rom_size: romSize,
      ram_size: ramSize,
      description,
    };
    dispatch(addLaptop(data));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
    if (returnMsg) {
      if (returnMsg.message === 'Laptop has been created successfully!') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection('/');
        }, 2500);
      } else if (returnMsg.message === 'Laptop already exists') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <section className="add-laptop-page">
        <h1>ADD A LAPTOP</h1>
        <div className="add-laptop-page-divider" />

        <form
          action=""
          className="add-laptop-form"
          onSubmit={handleSubmit(postData)}
        >
          <input
            type="input"
            name="name"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="input"
            name="photo_url"
            placeholder="domain.com/something.jpg*"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <input
            type="number"
            name="model_year"
            placeholder="Model Year*"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
          />

          <input
            type="number"
            name="price"
            placeholder="price $$*"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="input"
            name="rom_size"
            placeholder="Rom Size*"
            value={romSize}
            onChange={(e) => setRomSize(e.target.value)}
          />

          <input
            type="input"
            name="ram_size"
            placeholder="Ram Size*"
            value={ramSize}
            onChange={(e) => setRamSize(e.target.value)}
          />

          <textarea
            type="text"
            name="description"
            placeholder="Please introduce yourself*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <ul className="error-messages">
            {errors.name && <li className="errorMsg">{errors.name.message}</li>}

            {errors.photo_url && (
              <li className="errorMsg">{errors.photo_url.message}</li>
            )}

            {errors.model_year && (
              <li className="errorMsg">{errors.model_year.message}</li>
            )}

            {errors.price && (
              <li className="errorMsg">{errors.price.message}</li>
            )}

            {errors.rom_size && (
              <li className="errorMsg">{errors.rom_size.message}</li>
            )}

            {errors.ram_size && (
              <li className="errorMsg">{errors.ram_size.message}</li>
            )}

            {errors.description && (
              <li className="errorMsg">{errors.description.message}</li>
            )}
          </ul>

          <button type="submit" name="additem" className="session-btn">
            Add laptop
          </button>
        </form>

        <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
          <p>{returnMsg.message}</p>
        </div>
      </section>
    );
  }
  }
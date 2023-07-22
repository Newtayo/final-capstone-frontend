import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';

const SingleLaptop = () => {
  const { id } = useParams();
  const laptop = useSelector((state) => state.laptops.laptops).find(
    (item) => item.id === Number(id),
  );
  const state = useSelector((state) => state.laptops.laptops);
  if (!laptop && state.length === 0) {
    return <div className="loading">Loading</div>;
  }
  if (!laptop && state.length !== 0) {
    return <div className="loading">Element not found</div>;
  }
  return (
    <section className="laptop-details-page">
      <div className="laptop-photo-container">
        <img
          src={laptop.photoUrl}
          alt="laptop"
          className="detailsPageLaptopPhoto"
        />
      </div>
      <div className="laptop-details-container">
      <h1>
          {laptop.name}
        </h1>
        <p className="laptop-description">
          {laptop.description}
        </p>
        <ul className="details">
          <li>
            <span>Price: </span>
            <span>
              {laptop.price}
              $
            </span>
          </li>
          <li>
            <span>Model Year: </span>
            <span>{laptop.modelYear}</span>
          </li>
          <li>
            <span>Rom Size: </span>
            <span>{laptop.romSize}</span>
          </li>
          <li>
            <span>Ram Size: </span>
            <span>{laptop.ramSize}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SingleLaptop;

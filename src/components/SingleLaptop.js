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
      <div className="laptop-details-container"></div>
    </section>
  );
};

export default SingleLaptop;

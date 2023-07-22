import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';

const SingleLaptop = () => {
  const { id } = useParams();
  const laptop = useSelector((state) => state.laptops.laptops).find(
    (item) => item.id === Number(id),
  );
  return (
    <div>SingleLaptop</div>
  );
};

export default SingleLaptop;

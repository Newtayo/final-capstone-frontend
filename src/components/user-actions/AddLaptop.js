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
  
  }
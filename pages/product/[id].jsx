import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.scss";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const sizeHandle = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
    router.push("/cart");
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__left}>
        <div className={styles.product__imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.product__right}>
        <h1 className={styles.product__title}>{pizza.title}</h1>
        <span className={styles.product__price}>${price}</span>
        <p className={styles.product__desc}>{pizza.desc}</p>
        <h3 className={styles.product__choose}>Choose the size</h3>
        <div className={styles.product__sizes}>
          <div className={styles.product__size} onClick={() => sizeHandle(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.product__number}>Small</span>
          </div>
          <div className={styles.product__size} onClick={() => sizeHandle(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.product__number}>Medium</span>
          </div>
          <div className={styles.product__size} onClick={() => sizeHandle(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.product__number}>Large</span>
          </div>
        </div>
        <h3 className={styles.product__choose}>
          Choose additional ingredients
        </h3>
        <div className={styles.product__ingredients}>
          {pizza.extraOptions.map((option) => (
            <div key={option._id} className={styles.product__option}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.product__checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.product__add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.product__quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.product__btnAdd} onClick={handleClick}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://pizza-restaurant-sage.vercel.app/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/PizzaCard.module.scss";

const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.pizzaCard}>
      <Link href={`/product/${pizza._id}`} passHref>
        <Image src={pizza.img} alt="pizza" width="500" height="500" />
      </Link>
      <h1 className={styles.pizzaCard__title}>{pizza.title}</h1>
      <span className={styles.pizzaCard__price}>${pizza.prices[0]}</span>
      <p className={styles.pizzaCard__desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;

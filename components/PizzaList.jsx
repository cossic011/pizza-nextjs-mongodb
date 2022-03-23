import React from "react";
import styles from "../styles/PizzaList.module.scss";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.pizzaList}>
      <h1 className={styles.pizzaList__title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.pizzaList__desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        voluptates suscipit iste accusantium dolor nisi doloribus ad, doloremque
        quas ipsa laudantium vero soluta, placeat est ducimus consequatur fuga.
        Natus, sit.
      </p>
      <div className={styles.pizzaList__wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;

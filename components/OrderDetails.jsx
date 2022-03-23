import React, { useState } from "react";
import styles from "../styles/OrderDetails.module.scss";

const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, phone, total, paymentMethod: 0 });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            type="text"
            placeholder="Your Name..."
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            placeholder="Your Address..."
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number..."
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          ORDER
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

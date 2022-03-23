import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.container__item}>
        {" "}
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt="telephone"
            width={32}
            height={32}
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.container__item}>
        <ul className={styles.list}>
          <li className={styles.list__item}>Homepage</li>
          <li className={styles.list__item}>Products</li>
          <li className={styles.list__item}>Menu</li>
          <Link href="/" passHref>
            <Image src="/img/logo.png" alt="Logo" width="160px" height="69px" />
          </Link>
          <li className={styles.list__item}>Events</li>
          <li className={styles.list__item}>Blog</li>
          <li className={styles.list__item}>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.container__item} style={{ cursor: "pointer" }}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="Cart" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

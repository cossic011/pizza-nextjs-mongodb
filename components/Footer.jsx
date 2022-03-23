import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__item}>
        <Image src="/img/bg.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.footer__item}>
        <div className={styles.footer__card}>
          <h2 className={styles.footer__motto}>
            OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.footer__card}>
          <h1 className={styles.footer__title}>FIND OUR RESTARUANTS</h1>
          <p className={styles.footer__text}>
            1654 R. Don Road #304 <br /> NewYork, 85022 <br /> (602) 876-1010{" "}
          </p>
          <p className={styles.footer__text}>
            1654 R. Don Road #304 <br /> NewYork, 85022 <br /> (602) 876-1010{" "}
          </p>
          <p className={styles.footer__text}>
            1654 R. Don Road #304 <br /> NewYork, 85022 <br /> (602) 876-1010{" "}
          </p>
          <p className={styles.footer__text}>
            1654 R. Don Road #304 <br /> NewYork, 85022 <br /> (602) 876-1010{" "}
          </p>
        </div>
        <div className={styles.footer__card}>
          <h1 className={styles.footer__title}>FIND OUR RESTARUANTS</h1>
          <p className={styles.footer__text}>
            MONDAY UNTIL FRIDAY <br /> 9:00 - 22:00
          </p>
          <p className={styles.footer__text}>
            SATURDAY - SUNDAY <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

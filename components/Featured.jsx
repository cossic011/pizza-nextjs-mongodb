import React, { useState } from "react";
import styles from "../styles/Featured.module.scss";
import Image from "next/image";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }

    if (direction === "r") {
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.featured}>
      <div
        className={styles.featured__arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image
          src="/img/arrowl.png"
          alt="left"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        className={styles.featured__wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.featured__imgContainer} key={i}>
            <Image src={img} alt="img1" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        className={styles.featured__arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image
          src="/img/arrowr.png"
          alt="right"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Featured;

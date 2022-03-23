import axios from "axios";
import Image from "next/image";
import React from "react";
import styles from "../../styles/Order.module.scss";

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.order__done;
    if (index - status === 1) return styles.order__inProgress;
    if (index - status > 1) return styles.order__undone;
  };

  return (
    <div className={styles.order}>
      <div className={styles.order__left}>
        <div className={styles.order__row}>
          <table className={styles.order__table}>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.order__tr}>
              <td>
                <span className={styles.order__id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.order__name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.order__address}>{order.address}</span>
              </td>

              <td>
                <span className={styles.order__total}>${order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.order__row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" alt="status" width={30} height={30} />
            <span>Payment</span>
            <div className={styles.order__checkedIcon}>
              <Image
                src="/img/checked.png"
                className={styles.order__checked}
                alt="schecked"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" alt="status" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.order__checkedIcon}>
              <Image
                src="/img/checked.png"
                className={styles.order__checked}
                alt="schecked"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" alt="status" width={30} height={30} />
            <span>On The Way</span>
            <div className={styles.order__checkedIcon}>
              <Image
                src="/img/checked.png"
                className={styles.order__checked}
                alt="schecked"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image
              src="/img/delivered.png"
              alt="status"
              width={30}
              height={30}
            />
            <span>Delivered</span>
            <div className={styles.order__checkedIcon}>
              <Image
                src="/img/checked.png"
                className={styles.order__checked}
                alt="schecked"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.order__right}>
        <div className={styles.order__wrapper}>
          <h2 className={styles.order__title}>CART TOTAL</h2>
          <div className={styles.order__totalText}>
            <b className={styles.order__totalTextTitle}>Subtotal:</b>$
            {order.total}
          </div>
          <div className={styles.order__totalText}>
            <b className={styles.order__totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.order__totalText}>
            <b className={styles.order__totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.order__button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://pizza-restaurant-sage.vercel.app/api/orders/${params.id}`
  );
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;

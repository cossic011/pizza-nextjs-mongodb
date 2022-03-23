import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Cart.module.scss";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import OrderDetails from "../components/OrderDetails";
import { reset } from "../redux/cartSlice";
import { useRouter } from "next/router";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const amount = "2";
  const currency = "EUR";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("https://pizza-restaurant-sage.vercel.app/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__left}>
        <table className={styles.cart__table}>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.cart__imgContainer}>
                  <Image
                    src={product.img}
                    alt="pizza"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>
              <td>
                <span className={styles.cart__name}>{product.title}</span>
              </td>
              <td>
                <span className={styles.cart__extras}>
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}</span>
                  ))}
                </span>
              </td>
              <td>
                <span className={styles.cart__price}>${product.price}</span>
              </td>
              <td>
                <span className={styles.cart__quantity}>
                  {product.quantity}
                </span>
              </td>
              <td>
                <span className={styles.cart__total}>
                  ${product.price * product.quantity}
                </span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.cart__right}>
        <div className={styles.cart__wrapper}>
          <h2 className={styles.cart__title}>CART TOTAL</h2>
          <div className={styles.cart__totalText}>
            <b className={styles.cart__totalTextTitle}>Subtotal:</b>$
            {cart.total}
          </div>
          <div className={styles.cart__totalText}>
            <b className={styles.cart__totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.cart__totalText}>
            <b className={styles.cart__totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                Pay With Cash
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className={styles.cart__button}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;

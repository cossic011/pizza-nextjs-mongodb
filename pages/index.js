import React, { useEffect, useState } from "react";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import { products } from "../util/data";
import axios from "axios";
import AddButton from "../components/AddButton";
import Add from "../components/Add";

const Home = ({ pizzaList, admin }) => {
  const [close, setClose] = useState(true);
  const product = products.map((productOne) => {
    return productOne;
  });

  // useEffect(() => {
  //   fetch("/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product),
  //   });
  // }, []);

  return (
    <div>
      <Head>
        <title>Pizza Restaurant - Home</title>
        <meta name="description" content="Best pizza shop in Banja Luka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(
    "https://pizza-restaurant-sage.vercel.app/api/products"
  );
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

export default Home;

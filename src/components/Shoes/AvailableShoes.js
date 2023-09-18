import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableShoes.module.css";
import ShoeItem from "./ShoeItem/ShoeItem";

const DUMMY_SHOES = [
  {
    id: "m1",
    name: "guchhi",
    description: "Finest shoes",
    price: 22.99,
    sizes: { S: 5, M: 3, L: 7 }, // Add sizes and quantities
  },
  {
    id: "m2",
    name: "reebok",
    description: "nylon",
    price: 16.5,
    sizes: { S: 2, M: 4, L: 6 }, // Add sizes and quantities
  },
  {
    id: "m3",
    name: "adidas",
    description: "cotton",
    price: 12.99,
    sizes: { S: 8, M: 2, L: 5 }, // Add sizes and quantities
  },
  {
    id: "m4",
    name: "Action",
    description: "indian",
    price: 18.99,
    sizes: { S: 3, M: 5, L: 4 }, // Add sizes and quantities
  },
];

const AvailableShoes = () => {
  const [availableShoeSizes, setAvailableShoeSizes] = useState({});

  useEffect(() => {
    const initialSizes = {};
    DUMMY_SHOES.forEach((shoe) => {
      initialSizes[shoe.id] = { ...shoe.sizes };
    });
    setAvailableShoeSizes(initialSizes);
  }, []);

  const ShoesList = DUMMY_SHOES.map((shoe) => (
    <ShoeItem
      key={shoe.id}
      id={shoe.id}
      name={shoe.name}
      description={shoe.description}
      price={shoe.price}
      sizes={availableShoeSizes[shoe.id]} // Pass the available sizes to ShoeItem
    />
  ));

  return (
    <section className={classes.Shoes}>
      <Card>
        <ul>{ShoesList}</ul>
      </Card>
    </section>
  );
};

export default AvailableShoes;

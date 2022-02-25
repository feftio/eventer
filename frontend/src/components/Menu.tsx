import React from "react";
import Brand from "./Brand";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const Menu = () => {
  return (
    <div>
      <ul className="">
        {BRANDS.map((brand) => (
          <li className="" key={brand}>
            <Brand />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

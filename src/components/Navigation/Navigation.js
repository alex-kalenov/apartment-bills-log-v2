import { useState } from "react";
import { Link } from "react-router-dom";

import Hamburger from "../UI/Hamburger";

import { categories } from "../../helpers/data";

const Navigation = () => {
  const [visible, setVisible] = useState(false);

  const linkClickHandler = () => {
    setVisible(false);
  };

  const menuItems = categories.map((item) => {
    return (
      <li key={item.id}>
        <Link to={"/details?category=" + item.id} onClick={linkClickHandler}>
          {item.linkLabel}{" "}
          <i
            className={item.icon}
            style={{ color: item.iconColor, marginLeft: 5 }}
          ></i>
        </Link>
      </li>
    );
  });

  return (
    <Hamburger visible={visible} setVisible={setVisible}>
      <ul>{menuItems}</ul>
    </Hamburger>
  );
};

export default Navigation;

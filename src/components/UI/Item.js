import styles from "./Item.module.css";

const Item = (props) => {
  const itemClass = `${props.className} ${styles.item}  col-xxl-3 col-xl-4 col-md-6 col-12`;
  return <div className={itemClass}>{props.children}</div>;
};

export default Item;

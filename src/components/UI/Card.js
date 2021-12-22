import styles from "./Card.module.css";

const Card = (props) => {
  const cardClass = `${styles.card} ${props.className}`;
  return <div className={cardClass}>{props.children}</div>;
};

export default Card;

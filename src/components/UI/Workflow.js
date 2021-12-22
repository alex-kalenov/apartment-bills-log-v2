import styles from "./Workflow.module.css";

const Workflow = (props) => {
  return <div className={styles.workflow}>{props.children}</div>;
};

export default Workflow;

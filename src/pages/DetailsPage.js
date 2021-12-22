import styles from "./DetailsPage.module.css";

import { useLocation } from "react-router-dom";

import DetailsContent from "../components/Details/DetailsContent";

import { categories } from "../helpers/data";

const DetailsPage = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  return (
    <div>
      <div className={styles["header-wrapper"]}>
        <h2>
          Отчетные данные по <span>{existingCategory.detailLabel}</span>
        </h2>
      </div>
      <DetailsContent category={existingCategory.id} />
    </div>
  );
};

export default DetailsPage;

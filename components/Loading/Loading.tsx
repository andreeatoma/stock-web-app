import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';

import styles from "./Loading.module.scss";

const Loading = () => (
  <div className={styles["dollar-sign"]}>
    Loading stocks in progress
    <FontAwesomeIcon width="40" icon={faDollarSign} />
  </div>
);

export default Loading;

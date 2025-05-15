import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css'; // якщо використовуєш CSS-модулі

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Ой! Такої сторінки не існує.</p>
      <Link to="/" className={styles.link}>Повернутись на головну</Link>
    </div>
  );
};

export default NotFoundPage;

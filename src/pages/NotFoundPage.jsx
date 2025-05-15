import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Ой! Такої сторінки не існує.</p>
      <Link to="/">Повернутись на головну</Link>
    </div>
  );
};

export default NotFoundPage;

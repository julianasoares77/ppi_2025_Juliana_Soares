import { ShoppingBasket } from "lucide-react";
import styles from "./Header.module.css";
import { Link } from "react-router";

export function Header({ cart }) {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}><h1>TJA Megastore</h1></Link>
      <div className={styles.container}>
        <Link to="/login" className={styles.link}><h2>Login</h2></Link>
        <Link to="/cadastro" className={styles.link}><h2>Cadastro</h2></Link>
        <Link to="/gerenciar" className={styles.link}><h2>Gerenciar Produtos</h2></Link>
      </div>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />
          <p>
            Total: ${" "}
            {cart
  .reduce((total, item) => total + item.product.price * item.quantity, 0)
  .toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}

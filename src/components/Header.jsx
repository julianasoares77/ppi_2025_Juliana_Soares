import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />
          <p>
            Total: ${" "}
            {cart
              .reduce((total, product) => total + product.price * product.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
      </Link>
      <div className={styles.navLinks}>
        <Link to="/login" className={styles.link}>
          <h2>Login</h2>
        </Link>
        <Link to="/cadastro" className={styles.link}>
          <h2>Sign up</h2>
        </Link>
        <Link to="/gerenciar" className={styles.link}>
          <h2>Manage products</h2>
        </Link>
      </div>
    </div>
  );
}

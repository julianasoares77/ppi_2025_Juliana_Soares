import styles from "./Cart.module.css";

export function Cart({ cart, decreaseItem, increaseItem }) {
  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(({ product, quantity }) => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div>
                <button onClick={() => decreaseItem(product)}>-</button>
                <span style={{ margin: "0 8px" }}>{quantity}</span>
                <button onClick={() => increaseItem(product)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useState } from "react";
import { CartContext } from "../service/CartContext";

export function ProductList() {

  const { products, loading, error } = useContext(CartContext);


  const [word, setWord] = useState("")
  let handleInput = (e) => {
    setWord(e.target.value)
  }


  return (
    <div className={styles.container}>
      {/* Barra de pesquisa */}
      <input onChange={handleInput} className={styles.searchBar} placeholder="Search products"></input>

      <div className={styles.productList}>
      {products
        .filter((product) =>
          product.title.toLowerCase().includes(word.toLowerCase())
        )
        .map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message} ❌</p>}
    </div>
  );
}

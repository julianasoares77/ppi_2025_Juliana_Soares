import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { CadastroUsuario } from "./components/CadastroUsuario";
import { GerenciarProdutos } from "./components/GerenciarProdutos";

export default function App() {
  const [cart, setCart] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  function addToCart(productToAdd) {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === productToAdd.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product: productToAdd, quantity: 1 }];
      }
    });
  }

  function increaseItem(product) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseItem(product) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleLogin(email, senha) {
    setUsuario({ email, admin: true });
  }

  function handleRegister(dados) {
    console.log("Cadastro:", dados);
  }

  function handleAddProduto(prod) {
    setProdutos((prev) => [...prev, { ...prod, id: Date.now() }]);
  }

  function handleUpdateProduto(produto) {
    setProdutos((prev) => prev.map((p) => (p.id === produto.id ? produto : p)));
  }

  function handleDeleteProduto(id) {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              decreaseItem={decreaseItem}
              increaseItem={increaseItem}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/cadastro"
          element={<CadastroUsuario onRegister={handleRegister} />}
        />
        <Route
          path="/gerenciar"
          element={
              <GerenciarProdutos
                produtos={produtos}
                onAdd={handleAddProduto}
                onUpdate={handleUpdateProduto}
                onDelete={handleDeleteProduto}
              />
          }
        />
      </Routes>
    </>
  );
}

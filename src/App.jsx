import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { CadastroUsuario } from "./components/CadastroUsuario";
import { GerenciarProdutos } from "./components/GerenciarProdutos";
import { useState } from "react";
import { CartProvider } from "./service/CartContext";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState(null);

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
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
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
    </CartProvider>
  );
}

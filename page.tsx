"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [feedback, setFeedback] = useState<string>(''); // Estado para armazenar a mensagem de feedback
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setFeedback("Login efetuado");
        setTimeout(() => {
          router.push("/homepage"); // Redireciona para a página inicial após o login bem-sucedido
        }, 1000); // Delay para exibir a mensagem
      } else {
        setFeedback("Credenciais incorretas.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setFeedback("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-4">
            <span className="text-gray-700">E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Digite seu e-mail"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Senha</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Digite sua senha"
              required
            />
          </label>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Realizar login
          </button>
        </form>

        {feedback && (
          <p className={`text-center mt-4 ${feedback === "Login efetuado" ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Primeiro acesso?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
        <p className="text-center text-gray-600 mt-2">
          Esqueceu sua senha?{' '}
          <a href="/forgot" className="text-blue-600 hover:underline">
            Recupere-a agora mesmo!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;

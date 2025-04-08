import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("name", name);
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🦊</div>
          <h1 className="text-2xl font-bold text-gray-800">Fox Hunt Login</h1>
          <p className="text-sm text-gray-500">
            Masukkan nama kamu untuk mulai berburu!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required=""
              placeholder="Contoh: RakaSiPemburu"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

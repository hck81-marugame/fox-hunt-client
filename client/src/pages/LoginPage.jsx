import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length > 20) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name cannot be more than 20 characters long!",
      });
    }
    if (!name || !name.trim().length) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name cannot be empty!",
      });
    }
    localStorage.setItem("name", name.trim());
    navigate("/");
  }

  async function handleGenerateName() {
    const response = await axios.get("http://localhost:3000/generate-name");
    setName(response.data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🦊</div>
          <h1 className="text-2xl font-bold text-gray-800">Fox Hunt Login</h1>
          <p className="text-sm text-gray-500">
            Enter your name to start the hunt!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required=""
              placeholder="ex: Dora the Escobar"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGenerateName}
              className="w-50 flex-auto bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300 hover:from-pink-500 hover:via-orange-500 hover:to-yellow-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Generate Name
            </button>

            <button
              type="submit"
              className="w-50 flex-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // here you will call API -> fetch("/api/login")
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
  Admin <span className="text-black">Login</span>
</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Email</label>
          <input
            type="email"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>

      <p className=" text-sm mt-4">
        Doctor Login?{" "}
        <a href="/doctor-login" className="text-blue-600 hover:underline">
          Click here
        </a>
      </p>
    </div>
  );
}

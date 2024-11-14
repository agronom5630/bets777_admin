"use client";
import { useState } from "react";
import { Input, Button, Card, Spacer, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from '../axiosInstance';
import { useAdminStore } from '../store/useAdminStore';
import { setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const login = useAdminStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);
    try {
      const response = await axios.post("/admin/login", { email, password });
      const authToken = response.data.token;

      if (authToken) {
        setCookie('authToken', authToken, {
          maxAge: 60 * 60,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        const decodedToken: any = jwtDecode(authToken);
        const { role, username, email } = decodedToken;
        login(authToken, role, username, email);

        setIsRequesting(false);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full sm:w-96 p-6 shadow-lg bg-default-50 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        {error && (
          <div className="text-red-500 text-center mb-4 fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            isClearable
            label="Email"
            placeholder="Enter your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          <Input
            isClearable
            label="Password"
            placeholder="Enter your password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6"
          />

          <Button
            disabled={isRequesting}
            type="submit"
            fullWidth
            color="primary">
            {isRequesting ?
              <Spinner color="success" /> : "Login"} 
          </Button>
        </form>

        <Spacer y={2} />
      </Card>
    </div>
  );
};

export default LoginForm;

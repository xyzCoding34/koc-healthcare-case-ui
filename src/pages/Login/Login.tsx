import {
  Card,
  Center,
  Stack,
  Text,
  Image,
  TextInput,
  PasswordInput,
  Button,
  Tooltip,
} from "@mantine/core";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthenticationContext } from "../../Context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuthenticationContext();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/login`,
          {
            user_name: username,
            password: password,
          }
        );

        const { token, first_name } = response.data;

        // console.log(response.data);

        localStorage.setItem("token", token);

        login({
          id: uuidv4(),
          firstName: first_name,
          token: token,
        });

        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Giriş hatası");
        } else {
          toast.error("Sunucu hatası");
        }
      }
    } else {
      toast.error("Kullanıcı adı ve parola gereklidir");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Card m={20} withBorder radius={20} padding="xl" shadow="xl">
        <Stack align="center" justify="center" gap="md" m={15}>
          <Image src={logo} w={200} h={150} />
          <Text style={{ fontSize: "22px", fontWeight: "bold" }}>
            Hoşgeldiniz
          </Text>
          <Text style={{ fontSize: "16px", textAlign: "center" }}>
            Lütfen giriş yaparak devam ediniz.
          </Text>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            label="Kullanıcı adı"
            size="md"
            w="100%"
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="Parola"
            type="password"
            size="md"
            w="100%"
          />
          <Tooltip label="Kullanıcı adı: admin, Parola: admin" position="top">
            <Text
              style={{ fontSize: "14px", color: "gray", textAlign: "center" }}
            >
              Kullanıcı bilgilerini öğrenmek için fareyi sürükleyiniz.
            </Text>
          </Tooltip>

          <Button onClick={handleLogin} variant="outline" fullWidth mt={10}>
            Giriş
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}

export default Login;

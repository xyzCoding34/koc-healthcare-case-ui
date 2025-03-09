import { Card, Text } from "@mantine/core";
import { useAuthenticationContext } from "../../Context/AuthProvider";

function Home() {
  const { user } = useAuthenticationContext();

  const capitalizeFirstLetter = (name: string) => {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  };

  return (
    <Card shadow="xs" padding="xl" radius="lg">
      <Text style={{ textAlign: "center" }} size="26px">
        Hoşgeldin {capitalizeFirstLetter(user!.firstName)}
      </Text>
      <Text size="md" style={{ marginTop: 15, textAlign: "center" }}>
        Bu proje Koç Healthcare Case Study için hazırlanmıştır.
      </Text>
      <Text size="md" style={{ marginTop: 15, textAlign: "center" }}>
        Lütfen sol tarafta bulunan simülatörlerden bir tanesini seçiniz.
      </Text>
    </Card>
  );
}

export default Home;

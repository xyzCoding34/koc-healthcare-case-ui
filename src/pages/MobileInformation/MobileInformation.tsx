import { Center, Card, Stack, Text } from "@mantine/core";
import { MdMobileOff } from "react-icons/md";

function MobileInformation() {
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Card m={25} withBorder radius={20} padding="xl" shadow="xl">
        <Stack align="center">
          <MdMobileOff size={200} color="pink" />
          <Text style={{ textAlign: "center" }} size="26px" maw={300}>
            Daha doğru bir deneyim için lütfen mobilden giriş yapmayınız.
          </Text>
        </Stack>
      </Card>
    </Center>
  );
}

export default MobileInformation;

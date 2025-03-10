import {
  AppShell,
  Image,
  Group,
  Text,
  Button,
  Stack,
  Tooltip,
} from "@mantine/core";
import { ReactNode } from "react";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import { PiHeartbeatLight } from "react-icons/pi";
import { SiO2 } from "react-icons/si";
import { useAuthenticationContext } from "../../Context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import ProfileGroupType from "../../types/ProfileGroupType";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuthenticationContext();

  // TODO: fix !
  const profileGroup = user!.profileGroup;

  const navbarItems = [
    {
      id: uuidv4(),
      label: "Heart Rate Sensor",
      href: "/heart-rate",
      icon: <PiHeartbeatLight size={30} />,
      disabled: false,
      key: "heart-rate",
    },
    {
      id: uuidv4(),
      label: "SpO2 Sensor",
      href: "/oxygen-level",
      icon: <SiO2 size={20} />,
      disabled: true,
      key: "oxygen-level",
    },
  ];

  const updatedNavbarItems = navbarItems.map((x) => {
    if (profileGroup === ProfileGroupType.Nurse && x.key === "oxygen-level") {
      x.disabled = true;
    } else {
      x.disabled = false;
    }
    return x;
  });

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <AppShell
      padding={0}
      styles={{ main: { minHeight: "100vh" } }}
      header={{ height: 80 }}
      offsetScrollbars
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      w="100%"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Image
            width={40}
            h={25}
            src={logo}
            onClick={() => handleNavigate("/")}
          />
          <Button onClick={logout} variant="outline" color="red">
            Çıkış
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text
          size="22px"
          fw="normal"
          style={{ textAlign: "center" }}
          mt={10}
          mb={20}
        >
          Simülatörler
        </Text>
        <Stack align="center" justify="center" m={10}>
          {updatedNavbarItems.map((x) => (
            <Tooltip
              key={x.id}
              hidden={!x.disabled}
              label={"Yetkiniz bulunmamaktadır"}
              position="bottom"
            >
              <Button
                key={x.key}
                disabled={x.disabled}
                leftSection={x.icon}
                styles={{
                  section: { alignItems: "left" },
                }}
                variant="outline"
                fullWidth
                size="md"
                onClick={() => handleNavigate(x.href)}
              >
                {x.label}
              </Button>
            </Tooltip>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;

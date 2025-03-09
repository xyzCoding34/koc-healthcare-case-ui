import {
  Button,
  Card,
  Grid,
  Group,
  Modal,
  NumberInput,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useState } from "react";
import useHeartRate from "./useHeartRate";
import { useDisclosure } from "@mantine/hooks";
import FileModal from "../FileModal/FileModal";
import { v4 as uuidv4 } from "uuid";

const options = [
  { id: 1, label: "Test Ölçümü", value: "test" },
  { id: 2, label: "Manuel Ölçüm", value: "manuel" },
  { id: 3, label: "Dosya Aktarımı", value: "file" },
];

interface HeartRateValueProps {
  id: string;
  no: number;
  value: number;
}

function HeartRate() {
  const [selectedOption, setSelectedOption] = useState("");
  const [heartRateValues, setHeartRateValues] = useState<HeartRateValueProps[]>(
    Array.from({ length: 20 }, (_, index) => ({
      id: uuidv4(),
      no: index + 1,
      value: 0,
    }))
  );
  const [fileValues, setFileValues] = useState<number[]>([]);

  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  const [fileModalOpened, { open, close }] = useDisclosure(false);

  const { sendHeartRateSample, loading } = useHeartRate();

  const changeFileValues = (values: number[]) => {
    if (values.length > 1) {
      setIsFileSelected(true);
    }

    setFileValues(values);
  };

  const sendRequestForRandomData = async () => {
    const numbers: number[] = [];

    for (let i = 0; i < 30; i++) {
      const randomNum = Math.floor(Math.random() * (180 - 30 + 1)) + 30;

      numbers.push(randomNum);
    }

    await sendHeartRateSample(numbers);
  };

  const sendRequestWithFile = async () => {
    try {
      await sendHeartRateSample(fileValues);
    } catch (error) {
      console.log(error);
    } finally {
      setFileValues([]);
      setIsFileSelected(false);
    }
  };

  const updateHeartRateValue = (index: number, newValue: number | string) => {
    if (typeof newValue === "string") return;
    setHeartRateValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
    );
  };

  const changeSelectedOption = (value: string) => {
    setSelectedOption(value);
  };

  const renderer = () => {
    switch (selectedOption) {
      case "test":
        return (
          <Card mt={15} shadow="xs" bg={"gray"} padding="xl" radius="lg">
            <Text style={{ textAlign: "center" }} size="26px">
              Test Ölçümü
            </Text>
            <Text style={{ textAlign: "center" }} mt={10} size="18px">
              Test ölçümü sırasında rastgele 30 adet sayı gönderilecektir.
            </Text>
            <Text style={{ textAlign: "center" }} mt={10} size="18px">
              Başlatmak için butona basınız.
            </Text>
            <Button
              loading={loading}
              variant="outline"
              fullWidth
              mt={20}
              size="md"
              onClick={() => sendRequestForRandomData()}
            >
              Başlat
            </Button>
          </Card>
        );
      case "manuel":
        return (
          <>
            <Card mt={15} shadow="xs" bg={"gray"} padding="xl" radius="lg">
              <Text style={{ textAlign: "center" }} size="26px">
                Manuel Ölçüm
              </Text>
              <Text style={{ textAlign: "center" }} mt={10} size="18px">
                Manuel ölçüm için aşağıdaki kutulara değerler giriniz.
              </Text>
              <ScrollArea.Autosize offsetScrollbars mt={20} mah={200}>
                <Grid maw={500}>
                  {heartRateValues.map((x, index) => (
                    <NumberInput
                      mx={10}
                      w={100}
                      key={x.id}
                      label={`Ölçüm ${x.no}`}
                      value={x.value}
                      onChange={(value) =>
                        updateHeartRateValue(index, value ? value : 0)
                      }
                      min={0}
                      max={200}
                    />
                  ))}
                </Grid>
              </ScrollArea.Autosize>
            </Card>
            <Button
              fullWidth
              size="md"
              mt={15}
              loading={loading}
              variant="outline"
              onClick={() =>
                sendHeartRateSample(heartRateValues.map((rate) => rate.value))
              }
            >
              Gönder
            </Button>
          </>
        );
      case "file":
        return (
          <Card mt={15} shadow="xs" bg={"gray"} padding="xl" radius="lg">
            <Text style={{ textAlign: "center" }} size="26px">
              Dosya Aktarımı
            </Text>
            <Text mt={15} style={{ textAlign: "center" }} size="16px">
              Seçilen dosya formatı .txt ve rakamlar virgül ile ayrılmış
              olmalıdır.
            </Text>
            {isFileSelected ? (
              <Text mt={15}>{fileValues.length} adet veri seçildi.</Text>
            ) : (
              <></>
            )}
            <Group grow>
              <Button
                fullWidth
                size="md"
                mt={15}
                variant="outline"
                onClick={() => open()}
              >
                Dosya seç
              </Button>
              <Button
                fullWidth
                size="md"
                mt={15}
                disabled={!isFileSelected}
                loading={loading}
                variant="outline"
                onClick={() => sendRequestWithFile()}
              >
                Gönder
              </Button>
            </Group>
          </Card>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Grid grow align="center" justify="center">
        <Grid.Col>
          <Card
            shadow="xs"
            padding="xl"
            radius="lg"
            style={{ alignItems: "center" }}
          >
            <Text style={{ textAlign: "center" }} size="26px">
              Heart Rate Sensor
            </Text>
            <Text size="md" style={{ marginTop: 15, textAlign: "center" }}>
              Başlamak için aşağıdaki methodlardan bir tanesini seçiniz.
            </Text>
            <Group align="center" style={{ marginTop: 15 }}>
              {options.map((x) => (
                <Button
                  size="md"
                  variant="outline"
                  key={x.id}
                  onClick={() => changeSelectedOption(x.value)}
                  color={selectedOption === x.value ? "green" : "blue"}
                >
                  {x.label}
                </Button>
              ))}
            </Group>
            {renderer()}
          </Card>
        </Grid.Col>
      </Grid>
      <Modal
        opened={fileModalOpened}
        onClose={close}
        title="Dosya Seçiniz"
        size="md"
        withCloseButton={false}
      >
        <FileModal close={close} changeFileValues={changeFileValues} />
      </Modal>
    </>
  );
}

export default HeartRate;

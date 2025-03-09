import { Text, Grid, Input, Divider, Button } from "@mantine/core";
import { useRef } from "react";
import toast from "react-hot-toast";
import TxtFileParse from "./TxtFileParse";

interface FileModalProps {
  changeFileValues: (values: number[]) => void;
  close: () => void;
}

function FileModal({ changeFileValues, close }: FileModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref oluşturduk

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-debugger
    debugger;

    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.name.split(".").pop();
      if (fileType !== "txt") {
        toast.error("Sadece TXT file seçilebilir.");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Dosya seçimini sıfırla
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result;
        if (typeof fileContent === "string") {
          try {
            // const parsedData = JSON.parse(fileContent);
            const parsedData = TxtFileParse({ fileContent });
            if (Array.isArray(parsedData)) {
              changeFileValues(parsedData); // Veriyi state'e kaydet
            } else {
              toast.error("Geçersiz dosya formatı.");
            }
          } catch (error) {
            toast.error(
              "Dosya okuma hatası, lütfen dosya içeriğini kontrol ediniz ve tekrar deneyiniz."
            );
            console.error("Dosya okuma hatası:", error);
          }
        }
      };
      reader.readAsText(file); // Dosyayı metin olarak oku
    }
  };

  return (
    <Grid grow>
      <Grid.Col span={12}>
        <Divider mb={15} />
        <Text mb={15} size="16px">
          Lütfen TXT formatında dosya seçiniz.
        </Text>
        <Input
          ref={fileInputRef}
          accept=".txt"
          size="xl"
          type="file"
          onChange={handleFileChange}
        />
        <Button variant="outline" size="md" fullWidth mt={15} onClick={close}>
          Tamam
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export default FileModal;

export default function TxtFileParse({ fileContent }: { fileContent: string }) {
  const parsedData = fileContent
    .split(",")
    .map((item) => parseFloat(item.trim()))
    .filter((item) => !isNaN(item));

  if (parsedData.length < 1) {
    console.log("Liste boş");
  }

  return parsedData;
}

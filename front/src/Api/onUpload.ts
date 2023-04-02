export const onUpload = (e: any, stateF: any, stateS: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
  const file = e.target.files[0];
  stateF(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise<void>((resolve) => {
    reader.onload = () => {
      stateS(reader.result || null);
      resolve();
    };
  });
};
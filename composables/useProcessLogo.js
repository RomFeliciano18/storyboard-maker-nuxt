export const useProcessLogo = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;

        const img = new Image();
        img.src = base64Data;

        img.onload = async () => {
          const shape = img.width === img.height ? 'square' : 'rectangle';

          const formData = new FormData();
          formData.append('fileupload', base64Data);

          const url = `${productionApi()}/images/process`;

          const data = await $fetch(url, {
            method: 'POST',
            body: formData,
          });

          resolve({ data, shape });
        };

        img.onerror = () => reject('Failed to load image for shape detection');
      } catch (error) {
        reject('Failed to process image logo: ' + error.message);
      }
    };

    reader.onerror = () => reject('Failed to read file');
  });
};

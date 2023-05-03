// convert file to base64 data
export function fileToBase64(file: any) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      if (typeof result === "string") {
        const base64String = result.split(",")[1];
        resolve(base64String);
      } else {
        throw new Error("Failed to read file as Data URL.");
      }
    };
    reader.readAsDataURL(file);
  });
}


// convert base64 data to a blob
export function b64toBlob(b64Data: any, contentType = "", sliceSize = 512) {
  return new Promise<BlobPart>((resolve, reject) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    resolve(blob);
  });
}

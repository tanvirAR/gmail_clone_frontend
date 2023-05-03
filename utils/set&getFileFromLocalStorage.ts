  // set base64 file to localStorage
  function setToLocStrg(base64String: any) {
    return new Promise<void>((resolve, reject) => {
      try {
        localStorage.setItem("image", base64String);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


    // get base64 file from  localStorage
  const getFrmLocStrg = async () => {
    try {
      const data = await new Promise((resolve, reject) => {
        const item = localStorage.getItem("image");
        if (item) {
          resolve(item);
        } else {
          reject("Item not found in localStorage");
        }
      });
      return data as string;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export { setToLocStrg, getFrmLocStrg };
const fs = require("fs").promises;

let myFunc = () => {
  let appendMyFile = (filePath, nameOfFile) => {
    fs.appendFile(filePath, nameOfFile)
      .then(() => {
        fs.readFile("./newLipsum.txt", "utf-8")
          .then((data) => {
            data = data.toLowerCase();

            let arr = data.split(".");
            arr = arr.join("\n");
            fs.writeFile("./newLipsum2.txt", arr)
              .then(() => {
                console.log("lipsum2");
                fs.appendFile("./fileName.txt", "./newLipsum2.txt")
                  .then(() => {
                    fs.readFile("./newLipsum2.txt", "utf-8")
                      .then((data) => {
                        let dataArray = data.split("\n");
                        dataArray.sort();
                        let myData = dataArray.join("\n").trim();

                        fs.writeFile("./newLipsum3.txt", myData)
                          .then(() => {
                            fs.appendFile("./fileName.txt", "./newLipsum3.txt")
                              .then(() => {
                                fs.readFile("./fileName.txt", "utf-8")
                                  .then((data) => {
                                    data = data.split("./");
                                    console.log(data);
                                    for (let myData of data) {
                                      if (myData != "newLipsum.txt" && myData!='') {
                                        fs.unlink(myData, (err) => {
                                          if (err) console.log(err);
                                          return;
                                        });
                                      }
                                    }
                                  })
                                  .catch((err) => {
                                    console.log("Error1:", err);
                                  });
                              })
                              .catch((err) => {
                                console.log("Error2:", err);
                              });
                          })
                          .catch((err) => {
                            console.log("Error3:", err);
                          });
                      })
                      .catch((err) => {
                        console.log("Error4:", err);
                      });
                  })
                  .catch((err) => {
                    console.log("Error5:", err);
                  });
              })
              .catch((err) => {
                console.log("Error6:", err);
              });
          })
          .catch((err) => {
            console.log("Error7:", err);
          });
      })
      .catch((err) => {
        console.log("Error8:", err);
      });
  };

  let writeMyFile = (name, data) => {
    fs.writeFile(name, data)
      .then(() => {
        appendMyFile("./fileName.txt", name);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  let readMyFile = (fileNamePath) => {
    fs.readFile(fileNamePath, "utf-8")
      .then((data) => {
        data = data.toUpperCase();
        // console.log(data)
        writeMyFile("./newLipsum.txt", data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  readMyFile("./givenContent/lipsum.txt");
};
myFunc();

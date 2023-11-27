const fs = require("fs").promises;
const readlineSync = require("readline-sync");

let range = Math.random() * 10 + 1;

range = Math.floor(range);

let path = "./myFiles";

function fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles) {
  fs.access(absolutePathOfRandomDirectory)
    .then(() => {
      console.log("Directory exists!");
      randomFileGenerator(absolutePathOfRandomDirectory, randomNumberOfFiles);
    })
    .catch((err) => {
      console.log("no such directory exists, I'll make it..");
      fs.mkdir(absolutePathOfRandomDirectory)
        .then(() => {
          console.log("Directory is made..");
          randomFileGenerator(
            absolutePathOfRandomDirectory,
            randomNumberOfFiles
          );
        })
        .catch((err) => {
          console.log("Couldn't create directory:", err);
        });
    });

  let randomFileGenerator = (
    absolutePathOfRandomDirectory,
    randomNumberOfFiles
  ) => {
    for (let index = 1; index <= randomNumberOfFiles; index++) {
      fs.writeFile(
        `${absolutePathOfRandomDirectory}/generatedFile${index}.json`,
        '{"message":"welcome"}'
      ).catch((err) => {
        console.log(`Error in making file ${index} due to the error:`, err);
      });
    }
    let answer = readlineSync.question(
      "Do you want to delete files later after making?(y/n)"
    );
    if (answer == "y") {
      deleteFile(absolutePathOfRandomDirectory);
    }

  };

  let deleteFile = (absolutePathOfRandomDirectory) => {
    fs.readdir(absolutePathOfRandomDirectory)
      .then((data) => {
        data = data.toString();
        let fileNames = data.split(",");
        fileNames.forEach((ele) => {
          fs.unlink(absolutePathOfRandomDirectory + "/" + ele)
            .then(() => {
              console.log("Deleted files!");
            })
            .catch((err) => {
              console.log("Couldn't delete files as error exists:", err);
            });
        });
      })
      .catch((err) => {
        console.log("Couldn't read directory as error exist:", err);
      });
  };
}

fsProblem1(path, range);

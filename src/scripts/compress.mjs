import fs from "fs";
import archiver from "archiver";

// Directory containing the files you want to compress
const sourceDir = "./dist";

// Name of the output .zip file
const outputZip = "./panel.zip";

// Create a writable stream to the output .zip file
const output = fs.createWriteStream(outputZip);

// Create a new archiver instance
const archive = archiver("zip", {
  zlib: { level: 0 }, // Compression level (0-9)
});

// Pipe the output stream to the .zip file
archive.pipe(output);

// Add files from the source directory to the .zip file
archive.directory(sourceDir, false);

// Finalize the .zip file
archive.finalize();

// Listen for the 'close' event to know when the .zip file has been created
output.on("close", () => {
  // eslint-disable-next-line no-console
  console.log(`Successfully created ${outputZip}`);
});

// Handle any errors that occur during the compression process
archive.on("error", (err) => {
  throw err;
});

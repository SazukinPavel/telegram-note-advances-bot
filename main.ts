import App from "./src/app.js";

async function main() {
  console.log('start');
  const app = new App("6163566945:AAEU4D8JfyzcJ4LHliekDLmUIOxo4_OUyZY");

  await app.start();
}

main();

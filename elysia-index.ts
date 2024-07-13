import Elysia from "elysia";
import path from "path";
import { fromPath } from "./src/utils/image-utils";

// run it along with the express code that does the sae thing and see the difference.

const app = new Elysia();
app.get("/",async ({ request, set })=>{
  set.status = 400;
  return { message: "OK" };
})
app.post("/upload", async ({ request, set }) => {
  const formData = await request.formData();
  const upload = formData.get("upload");
  console.log(upload);
  if (!upload) {
    set.status = 400;
    return { error: "No file uploaded" };
  }

  const filename = `uploads/${Date.now()}`; 
  const size = await Bun.write(filename, upload);
  const filePath = path.join(__dirname, filename);

  await fromPath(filePath);

  set.status = 201;
  return { filename, size };
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import { Context } from "koa";
import { analyzeImage } from "../services/gemini";

export default {
  async analyze(ctx: Context) {
    const file = ctx.request.files?.image as any;
    console.log("Image Analysis Request Received");
    console.log("Files:", JSON.stringify(ctx.request.files, null, 2));

    if (!file) {
      console.error("No image uploaded");
      return ctx.badRequest("No image uploaded");
    }

    // Check possible path properties
    const filePath = file.filepath || file.filePath || file.path;
    console.log("Detected File Path:", filePath);

    if (!filePath) {
      console.error("File path missing in file object:", file);
      return ctx.badRequest("File path missing");
    }

    try {
      const result = await analyzeImage(filePath);
      return ctx.send({ success: true, result });
    } catch (error) {
      console.error("Error in image analysis controller:", error);
      ctx.internalServerError("Analysis failed", { error: error.message, stack: error.stack });
    }
  },
};

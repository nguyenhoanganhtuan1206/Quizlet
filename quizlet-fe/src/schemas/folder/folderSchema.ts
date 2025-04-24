import { z } from "zod";

export const folderSchema = z.object({
  name: z
    .string()
    .nonempty("You folder name cannot be empty")
    .max(150, "Your folder name cannot larger than 150 characters"),
  description: z
    .string()
    .max(255, "Your folder description cannot larger than 255 characters"),
  parent_id: z.array(z.string()),
});

import { z } from "zod";

// implement all the dtos below here

export const developerIdSchema = z.object({
    developerId: z.coerce.bigint("Developer ID must be a valid number"),
});

export type DeveloperIdDto = z.infer<typeof developerIdSchema>;
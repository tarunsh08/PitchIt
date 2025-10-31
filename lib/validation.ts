import { z } from "zod"

export const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long").max(1000, "Description must be at most 1000 characters long"),
    category: z.string().min(3, "Category must be at least 3 characters long").max(50, "Category must be at most 50 characters long"),
    link: z.string().url("Invalid URL").refine(async (url) => {
        try {
            const res = await fetch(url, {
                method: "HEAD",
            })
            const contentType = res.headers.get("content-type")
            return contentType?.startsWith("image/")
        } catch {
            return false
        }
    }),
    pitch: z.string().min(10, "Pitch must be at least 3 characters long"),
})
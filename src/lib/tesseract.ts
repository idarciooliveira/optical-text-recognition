import Tesseract, { ImageLike } from "tesseract.js";

export default async function ExtractText(image: ImageLike): Promise<string> {
    const worker = await Tesseract.createWorker('eng')
    const { data: { text } } = await worker.recognize(image)
    await worker.terminate()
    return text
}
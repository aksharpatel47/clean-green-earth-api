import { QueryFile } from "pg-promise"
import { resolve } from "path"

export function loadSQL(dirPath: string, filePath: string) {
  return new QueryFile(resolve(dirPath, filePath), {
    debug: process.env.NODE_ENV === "development",
    compress: true,
    minify: true
  })
}
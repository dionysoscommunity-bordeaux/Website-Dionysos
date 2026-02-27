import { readdir, readFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import matter from 'gray-matter'

type BaseContentRecord = {
  slug: string
  body: string
}

export async function readCollection<T extends Record<string, unknown>>(
  collectionName: string
): Promise<Array<T & BaseContentRecord>> {
  const baseDir = join(process.cwd(), 'content', collectionName)
  const entries = await readdir(baseDir, { withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))

  const records = await Promise.all(
    files.map(async (file) => {
      const fullPath = join(baseDir, file.name)
      const raw = await readFile(fullPath, 'utf8')
      const parsed = matter(raw)
      return {
        ...(parsed.data as T),
        slug: parse(file.name).name,
        body: parsed.content.trim()
      }
    })
  )

  return records
}

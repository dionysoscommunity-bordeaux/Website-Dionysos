import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = join(process.cwd(), 'content')
const REQUIRED_CHECKLIST_KEYS = ['message_ok', 'legal_ok', 'data_ok', 'seo_ok']

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) return listMarkdownFiles(fullPath)
      if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath]
      return []
    })
  )
  return files.flat()
}

function validateFrontmatter(filePath, data) {
  const errors = []

  if (!data.seo_title || String(data.seo_title).trim().length === 0) {
    errors.push('seo_title manquant')
  }
  if (!data.seo_description || String(data.seo_description).trim().length === 0) {
    errors.push('seo_description manquant')
  }

  const checklist = data.publication_checklist
  if (!checklist || typeof checklist !== 'object') {
    errors.push('publication_checklist manquante')
    return errors
  }

  for (const key of REQUIRED_CHECKLIST_KEYS) {
    if (checklist[key] !== true) {
      errors.push(`publication_checklist.${key} doit etre true`)
    }
  }

  return errors
}

async function run() {
  const files = await listMarkdownFiles(CONTENT_DIR)
  const allErrors = []

  for (const filePath of files) {
    const raw = await readFile(filePath, 'utf8')
    const parsed = matter(raw)
    const errors = validateFrontmatter(filePath, parsed.data)
    if (errors.length > 0) allErrors.push({ filePath, errors })
  }

  if (allErrors.length > 0) {
    console.error('Validation contenu echouee:')
    for (const item of allErrors) {
      console.error(`- ${item.filePath}`)
      for (const error of item.errors) {
        console.error(`  - ${error}`)
      }
    }
    process.exit(1)
  }

  console.log(`Validation contenu OK (${files.length} fichiers)`)
}

run().catch((error) => {
  console.error('Erreur validation contenu:', error)
  process.exit(1)
})

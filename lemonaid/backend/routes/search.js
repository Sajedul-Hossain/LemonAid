import { Router } from 'express'
const router = Router()

// Example in-memory dataset. Replace with DB or external data as needed.
const ITEMS = [
  { id: '1001', name: 'Lemonade Stand', title: 'Lemonade Stand (1001)', description: 'Classic wooden stand', price: 49.99 },
  { id: '1002', name: 'Citrus Squeezer', title: 'Citrus Squeezer (1002)', description: 'Handy kitchen squeezer', price: 12.99 },
  { id: '1003', name: 'Glass Pitcher', title: 'Glass Pitcher (1003)', description: '2L pitcher', price: 15.0 }
]

// GET /api/search?q=...&source=local|marketplace|both
router.get('/api/search', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase()
    const source = (req.query.source || 'both')
    if (!q) return res.json({ results: [] })

    // Local matches: id exact or name/title contains
    const local = ITEMS.filter(it =>
      it.id.toLowerCase() === q ||
      it.name.toLowerCase().includes(q) ||
      (it.title && it.title.toLowerCase().includes(q))
    ).map(i => ({ ...i, source: 'local' }))

    // Marketplace: placeholder — return empty for now. In the future, call external APIs here.
    const marketplace = []

    let results = []
    if (source === 'local') results = local
    else if (source === 'marketplace') results = marketplace
    else results = local.concat(marketplace)

    res.json({ results })
  } catch (err) {
    next(err)
  }
})

export default router

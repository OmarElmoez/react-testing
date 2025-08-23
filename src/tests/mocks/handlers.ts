import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/categories', () => {
    return HttpResponse.json([
      { id: 1, name: 'category-1' },
      { id: 2, name: 'category-2' },
      { id: 3, name: 'category-3' },
    ])
  })
]
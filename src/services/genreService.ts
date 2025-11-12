import { apiClient } from './api'
import { Genre, BookListResponse } from '@/types'

export const genreService = {
  getGenres: async () => {
    try {
      console.log('🔍 Attempting to fetch genres...')
      
      // Try main /genres endpoint first
      try {
        const response = await apiClient.get<any>('/genres')
        console.log('✅ /genres endpoint response:', response.data)
        
        // The backend returns { status: true, data: genres }
        let genreData: Genre[] = []
        
        if (response.data?.data && Array.isArray(response.data.data)) {
          genreData = response.data.data
        } else if (Array.isArray(response.data)) {
          genreData = response.data
        }
        
        console.log('📋 Parsed genres:', genreData)
        if (genreData && genreData.length > 0) {
          console.log(`✅ Successfully loaded ${genreData.length} genres from /genres endpoint`)
          return genreData
        } else {
          console.log('⚠️ /genres returned empty array')
          return genreData
        }
      } catch (directError: any) {
        const statusCode = directError?.response?.status || 'unknown'
        const statusText = directError?.response?.statusText || 'error'
        console.log(`ℹ️ /genres endpoint not available (${statusCode} ${statusText}), using fallback strategy...`)
        
        // Fallback: Extract genres from books endpoint
        console.log('📚 Fallback: Extracting genres from books...')
        
        const genresMap = new Map<string, Genre>()
        let page = 1
        let totalPages = 1
        const limit = 100
        let foundBooks = 0

        // Fetch all pages to collect all unique genres
        while (page <= totalPages) {
          try {
            console.log(`📖 Fetching books page ${page} (limit: ${limit})...`)
            const response = await apiClient.get<BookListResponse>('/books', { 
              params: { 
                page,
                limit
              }
            })
            
            const books = response.data?.data || []
            const meta = response.data?.meta

            foundBooks += books.length
            console.log(`  ✓ Page ${page}: Got ${books.length} books`)

            // Extract unique genres from this page's books
            books.forEach((book: any) => {
              if (book?.genre?.id && book?.genre?.name) {
                const genreId = book.genre.id
                if (!genresMap.has(genreId)) {
                  genresMap.set(genreId, {
                    id: book.genre.id,
                    name: book.genre.name,
                    created_at: book.genre.created_at,
                    updated_at: book.genre.updated_at,
                    deleted_at: book.genre.deleted_at
                  })
                  console.log(`    → Added genre: "${book.genre.name}"`)
                }
              }
            })

            // Calculate total pages
            if (meta?.total && meta?.limit) {
              totalPages = Math.ceil(meta.total / meta.limit)
            }

            console.log(`  Total unique genres collected: ${genresMap.size}`)

            // Stop if we've fetched all pages
            if (page >= totalPages) {
              console.log(`  Reached last page (${page}/${totalPages})`)
              break
            }
            
            page++
          } catch (pageError: any) {
            const statusCode = pageError?.response?.status || 'unknown'
            const errorMsg = pageError?.response?.data?.message || pageError?.message || 'unknown error'
            console.error(`❌ Error fetching page ${page}: ${statusCode} - ${errorMsg}`)
            break
          }
        }

        const genres = Array.from(genresMap.values())
        console.log(`✅ Final result: Found ${foundBooks} books with ${genres.length} unique genres:`, genres)
        
        return genres
      }
    } catch (error: any) {
      console.error('❌ Fatal error in getGenres:', error?.message || error)
      // Return empty array instead of throwing to prevent form from breaking
      return []
    }
  },
}

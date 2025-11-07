// src/pages/public/PublicLanding.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { bookService } from '../../services/bookService'
import { Book } from '@/types'

const PublicLanding = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks(1, 6)
        setBooks(response.data || [])
      } catch (error) {
        console.error('Failed to fetch books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar userEmail="" />
      
      <main style={{ flex: 1, backgroundColor: '#f5e6d3', padding: '40px 20px' }}>
        {/* Hero Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 60px',
          textAlign: 'center',
          backgroundColor: 'linear-gradient(135deg, #3e2723 0%, #5a4f3f 100%)',
          padding: '60px 40px',
          borderRadius: '12px',
          color: '#f4e8c1'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '2px', fontFamily: "'Cinzel', serif" }}>
            🏰 HOGWARTS LIBRARY
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Explore our collection of magical books and literature
          </p>
        </div>

        {/* Books Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem', 
            color: '#3e2723',
            fontFamily: "'Cinzel', serif",
            textAlign: 'center'
          }}>
            Featured Books
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#704214' }}>
              Loading books...
            </div>
          ) : books.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#704214' }}>
              No books available
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              {books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/books/${book.id}`)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e8d4b8',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h3 style={{ color: '#8b0000', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    {book.title}
                  </h3>
                  <p style={{ color: '#704214', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <strong>Author:</strong> {book.writer}
                  </p>
                  <p style={{ color: '#704214', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <strong>Price:</strong> ${book.price}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      backgroundColor: book.stock_quantity > 0 ? '#d4edda' : '#f8d7da',
                      color: book.stock_quantity > 0 ? '#155724' : '#721c24',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {book.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PublicLanding

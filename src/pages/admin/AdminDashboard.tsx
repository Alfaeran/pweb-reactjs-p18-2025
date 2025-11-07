// src/pages/admin/AdminDashboard.tsx
import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'users' | 'transactions' | 'overview'>('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 style={{ color: '#8b0000', fontSize: '1.8rem', marginBottom: '2rem' }}>Dashboard Overview</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                { title: 'Total Books', value: '150', color: '#FFD700' },
                { title: 'Total Users', value: '48', color: '#50C878' },
                { title: 'Active Transactions', value: '23', color: '#8B0000' },
                { title: 'Revenue', value: '$4,250', color: '#c9a961' }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderLeft: `4px solid ${stat.color}`,
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#704214', marginBottom: '0.5rem' }}>{stat.title}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'books':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#8b0000', fontSize: '1.8rem' }}>Manage Books</h2>
              <button style={{
                backgroundColor: '#FFD700',
                color: '#3b2a1a',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Add New Book
              </button>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#3e2723', color: '#c9a961' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Author</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e8d4b8' }}>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>Book {idx}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>Author {idx}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>${25 * idx}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>10</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button style={{
                          backgroundColor: '#c9a961',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontSize: '0.85rem'
                        }}>
                          Edit
                        </button>
                        <button style={{
                          backgroundColor: '#8b0000',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'users':
        return (
          <div>
            <h2 style={{ color: '#8b0000', fontSize: '1.8rem', marginBottom: '2rem' }}>Manage Users</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#3e2723', color: '#c9a961' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Username</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Joined</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e8d4b8' }}>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>user{idx}@hogwarts.edu</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>student{idx}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>2025-01-{idx * 5}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button style={{
                          backgroundColor: '#c9a961',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontSize: '0.85rem'
                        }}>
                          View
                        </button>
                        <button style={{
                          backgroundColor: '#8b0000',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}>
                          Ban
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'transactions':
        return (
          <div>
            <h2 style={{ color: '#8b0000', fontSize: '1.8rem', marginBottom: '2rem' }}>Transaction History</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#3e2723', color: '#c9a961' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Transaction ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Amount</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e8d4b8' }}>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>TXN{String(idx).padStart(4, '0')}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>student{idx}@hogwarts.edu</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>2025-01-{idx * 5}</td>
                      <td style={{ padding: '1rem', color: '#3a2f1f' }}>${50 * idx}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}>
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar userEmail="" />
      
      <main style={{ flex: 1, backgroundColor: '#f5e6d3', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid #c9a961',
            paddingBottom: '1rem'
          }}>
            {(['overview', 'books', 'users', 'transactions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: activeTab === tab ? '#c9a961' : 'transparent',
                  color: activeTab === tab ? 'white' : '#704214',
                  border: '2px solid #c9a961',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard

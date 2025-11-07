// src/components/ui/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) end = Math.min(totalPages, 5);
    if (currentPage > totalPages - 3) start = Math.max(1, totalPages - 4);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const PageButton: React.FC<{ page: number, disabled?: boolean, children?: React.ReactNode }> = ({ page, disabled, children }) => (
    <button
      onClick={() => onPageChange(page)}
      disabled={disabled}
      style={{
        margin: '0 3px',
        padding: '8px 12px',
        backgroundColor: page === currentPage ? '#eab308' : 'transparent',
        color: page === currentPage ? '#3b2a1a' : '#5a4632',
        border: '1px solid #eab308',
        cursor: 'pointer',
        fontWeight: 'bold',
        borderRadius: '4px',
        opacity: disabled ? 0.5 : 1
      }}
    >
      {children || page}
    </button>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <PageButton page={currentPage - 1} disabled={currentPage === 1}>Previous</PageButton>

      {getPageNumbers().map(page => (
        <PageButton key={page} page={page} />
      ))}

      <PageButton page={currentPage + 1} disabled={currentPage === totalPages}>Next</PageButton>
    </div>
  );
};
export default Pagination;
import React, { useState, useMemo } from 'react';

const tutorialsData = [
  { id: 1, title: 'What is a Stock? – Investopedia', url: 'https://www.investopedia.com/terms/s/stock.asp', category: 'Beginner' },
  { id: 2, title: 'Stock Market for Beginners – YouTube (Ryan Scribner)', url: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo', category: 'Beginner' },
  { id: 3, title: 'How to Trade Stocks – NerdWallet', url: 'https://www.nerdwallet.com/article/investing/how-to-trade-stocks', category: 'Beginner' },
  { id: 4, title: 'How to Invest in Stocks – The Motley Fool', url: 'https://www.fool.com/investing/how-to-invest/stocks/', category: 'Intermediate' },
  { id: 5, title: 'Stock & Bonds Basics – Khan Academy', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds', category: 'Beginner' },
  { id: 6, title: 'How the Stock Market Works – YouTube (Wealth Hacker)', url: 'https://www.youtube.com/watch?v=9xjP7cSdfqI', category: 'Beginner' },
  { id: 7, title: 'Robinhood Learn – Trading Basics, Strategy, and Terms', url: 'https://www.robinhood.com/learn', category: 'Intermediate' },
  { id: 8, title: 'FINRA Investor Education', url: 'https://www.finra.org/investors/learn-to-invest', category: 'Advanced' },
];

const CATEGORY_COLORS = {
  Beginner: '#4caf50',     // green
  Intermediate: '#ff9800', // orange
  Advanced: '#f44336',     // red
};

const Tutorial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('None');
  };

  const filteredTutorials = useMemo(() => {
    let filtered = tutorialsData.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || t.category === selectedCategory)
    );
    if (sortBy === 'Title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Category') {
      filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
    }
    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div style={{
      display: 'flex',
      maxWidth: 900,
      margin: '30px auto',
      gap: 20,
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      color: '#222',
    }}>
      {/* Left panel: Filters + Tutorials */}
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: 8 }}>📘 Stock Trading Tutorials</h2>
        <p style={{ marginTop: 0, color: '#555' }}>Explore tutorials and bookmark resources to learn trading effectively:</p>

        {/* Filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 20,
          alignItems: 'center',
        }}>
          <input
            type="search"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flexGrow: 1,
              minWidth: 180,
              padding: '10px 14px',
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #bbb',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              outlineColor: '#4caf50',
            }}
            spellCheck={false}
            autoComplete="off"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            <option value="All">All Categories</option>
            {Object.keys(CATEGORY_COLORS).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            <option value="None">Sort By</option>
            <option value="Title">Title</option>
            <option value="Category">Category</option>
          </select>
          <button
            onClick={clearFilters}
            style={{
              padding: '10px 18px',
              backgroundColor: '#eee',
              border: '1px solid #ccc',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ddd'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#eee'}
            aria-label="Reset all filters"
          >
            Reset
          </button>
        </div>

        {/* Tutorials List */}
        <div style={{ display: 'grid', gap: 14 }}>
          {filteredTutorials.length === 0 && (
            <p style={{ fontStyle: 'italic', color: '#777' }}>No tutorials found.</p>
          )}
          {filteredTutorials.map(tutorial => (
            <article
              key={tutorial.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                background: '#fafafa',
                borderRadius: 14,
                boxShadow: '0 4px 8px rgb(0 0 0 / 0.06)',
                transition: 'transform 0.2s ease',
                cursor: 'default',
              }}
              tabIndex={0}
              onFocus={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onBlur={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              aria-label={`${tutorial.title}, category ${tutorial.category}`}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: '700',
                    fontSize: 18,
                    color: '#0074cc',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    maxWidth: '85%',
                  }}
                  title={tutorial.title}
                >
                  {tutorial.title}
                </a>
                <span
                  style={{
                    marginLeft: 12,
                    backgroundColor: CATEGORY_COLORS[tutorial.category],
                    color: 'white',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: 20,
                    fontSize: 12,
                    userSelect: 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  {tutorial.category}
                </span>
              </div>

              <button
                onClick={() => toggleBookmark(tutorial.id)}
                aria-pressed={bookmarks.includes(tutorial.id)}
                title={bookmarks.includes(tutorial.id) ? 'Remove bookmark' : 'Add bookmark'}
                style={{
                  fontSize: 18,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: bookmarks.includes(tutorial.id) ? '#ffbf00' : '#bbb',
                  transition: 'color 0.3s ease',
                  userSelect: 'none',
                }}
              >
                {bookmarks.includes(tutorial.id) ? '★' : '☆'}
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Right panel: Bookmarks */}
      <aside style={{
        width: 250,
        borderLeft: '1px solid #ddd',
        paddingLeft: 20,
        position: 'sticky',
        top: 20,
        height: 'fit-content',
      }}>
        <h3 style={{ marginTop: 0 }}>⭐ Your Bookmarks</h3>
        {bookmarks.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#777' }}>No bookmarks yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 12 }}>
            {bookmarks.map(id => {
              const t = tutorialsData.find(x => x.id === id);
              return (
                <li key={id} style={{ marginBottom: 10 }}>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0074cc', textDecoration: 'underline' }}
                  >
                    {t.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default Tutorial;

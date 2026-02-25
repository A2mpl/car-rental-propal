'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const OPTIONS = {
  type:  ['Tous', 'Électrique', 'Sport', 'SUV', 'Cabriolet'] as const,
  brand: ['Toutes marques', 'Audi', 'BMW', 'Ferrari', 'Lamborghini', 'McLaren', 'Mercedes', 'Porsche', 'Tesla'] as const,
  model: ['Tous modèles', '911 GT3', 'Taycan', 'Model 3', 'Model S', '720S', 'Huracán', 'RS6'] as const,
  price: ['Tous les prix', '< €200/jour', '€200–500/jour', '> €500/jour'] as const,
} as const;

type Filters = { [K in keyof typeof OPTIONS]: string };

/**
 * Maps the SearchBar selections to /shop URL search params, then
 * navigates so the server component re-renders with the right filters.
 */
function buildShopParams(filters: Filters): URLSearchParams {
  const p = new URLSearchParams();

  // Type → fuel / body
  switch (filters.type) {
    case 'Électrique':   p.append('fuels', 'electric'); break;
    case 'Sport':        p.append('bodies', 'sport'); p.append('bodies', 'supercar'); break;
    case 'SUV':          p.append('bodies', 'suv'); break;
    case 'Cabriolet':    p.append('bodies', 'convertible'); break;
  }

  // Brand → makes
  if (filters.brand !== 'Toutes marques') p.append('makes', filters.brand);

  // Model → keyword search
  if (filters.model !== 'Tous modèles') p.set('search', filters.model);

  // Price → range
  if (filters.price === '< €200/jour')       { p.set('priceTo', '200'); }
  else if (filters.price === '€200–500/jour') { p.set('priceFrom', '200'); p.set('priceTo', '500'); }
  else if (filters.price === '> €500/jour')   { p.set('priceFrom', '500'); }

  return p;
}

export default function SearchBar() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    type: 'Tous',
    brand: 'Toutes marques',
    model: 'Tous modèles',
    price: 'Tous les prix',
  });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = buildShopParams(filters);
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const LABELS: Record<keyof typeof OPTIONS, string> = {
    type: 'Type',
    brand: 'Marque',
    model: 'Modèle',
    price: 'Prix',
  };

  return (
    <div
      style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '14px',
          padding: '10px 10px 10px 28px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        {(Object.keys(OPTIONS) as Array<keyof typeof OPTIONS>).map((key, index) => (
          <React.Fragment key={key}>
            <div style={{ flex: 1, position: 'relative' }}>
              {/* Field label */}
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9A9A9A',
                marginBottom: '3px',
                paddingRight: '16px',
              }}>
                {LABELS[key]}
              </span>

              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  color: '#111111',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body), sans-serif',
                }}>
                  {filters[key]}
                </span>
                <ChevronDown
                  size={13}
                  style={{
                    color: '#888',
                    transition: 'transform 0.3s ease',
                    transform: openMenu === key ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                />
              </button>

              <AnimatePresence>
                {openMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 16px)',
                      left: '-12px',
                      width: '200px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.10), 0 4px 12px rgba(0, 0, 0, 0.06)',
                      zIndex: 1000,
                      overflow: 'hidden',
                    }}
                  >
                    {OPTIONS[key].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setFilters({ ...filters, [key]: opt });
                          setOpenMenu(null);
                        }}
                        style={{
                          padding: '11px 18px',
                          fontSize: '13px',
                          fontFamily: 'var(--font-body), sans-serif',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                          backgroundColor:
                            filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent',
                          fontWeight: filters[key] === opt ? 600 : 400,
                          color: filters[key] === opt ? '#3E6356' : '#3D3D3D',
                        } as React.CSSProperties}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(62, 99, 86, 0.07)';
                          e.currentTarget.style.color = '#3E6356';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent';
                          e.currentTarget.style.color =
                            filters[key] === opt ? '#3E6356' : '#3D3D3D';
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {index < 3 && (
              <div style={{
                width: '1px',
                height: '34px',
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                marginRight: '16px',
                flexShrink: 0,
              }} />
            )}
          </React.Fragment>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: '#3E6356',
            color: '#FFFFFF',
            border: 'none',
            padding: '14px 30px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-body), sans-serif',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            marginLeft: '8px',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2D4A3F')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3E6356')}
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}

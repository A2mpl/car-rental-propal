'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ALL_PRICES, ALL_TYPES, FIELD_KEYS, type FieldKey, LABELS } from '@/components/ui/search/data';
import type { Filters } from '@/components/ui/search/types';
import { buildShopParams, getFilteredBrands, getFilteredModels } from '@/components/ui/search/utils';

export default function SearchBar() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    type: 'Tous',
    brand: 'Toutes marques',
    model: 'Tous modèles',
    price: 'Tous les prix',
  });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const availableBrands = getFilteredBrands(filters.type);
  const availableModels = getFilteredModels(filters.type, filters.brand);

  const getOptions = (key: FieldKey): string[] => {
    switch (key) {
      case 'type':
        return ALL_TYPES;
      case 'brand':
        return availableBrands;
      case 'model':
        return availableModels;
      case 'price':
        return ALL_PRICES;
      default:
        return [];
    }
  };

  /* ── Mise à jour avec reset en cascade ── */
  const handleSelect = (key: FieldKey, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };

      if (key === 'type') {
        // Reset marque & modèle quand on change de type
        next.brand = 'Toutes marques';
        next.model = 'Tous modèles';
      }

      if (key === 'brand') {
        // Reset modèle quand on change de marque
        next.model = 'Tous modèles';
      }

      return next;
    });
    setOpenMenu(null);
  };

  /* ── Fermer les menus au clic extérieur ── */
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

  return (
    <search
      style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'color-mix(in srgb, var(--surface) 92%, transparent)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '14px',
          padding: '10px 10px 10px 28px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        {FIELD_KEYS.map((key, index) => (
          <React.Fragment key={key}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  marginBottom: '3px',
                  paddingRight: '16px',
                }}
              >
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
                <span
                  style={{
                    color: 'var(--text)',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'var(--font-body), sans-serif',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {filters[key]}
                </span>
                <ChevronDown
                  size={13}
                  style={{
                    color: 'var(--muted)',
                    transition: 'transform 0.3s ease',
                    transform: openMenu === key ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                />
              </button>

              <AnimatePresence>
                {openMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: '-12px',
                      minWidth: '160px',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      backgroundColor: 'var(--surface)',
                      borderRadius: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(0, 0, 0, 0.05)',
                      zIndex: 1000,
                    }}
                  >
                    {getOptions(key).map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleSelect(key, opt)}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '7px 14px',
                          fontSize: '12px',
                          fontFamily: 'var(--font-body), sans-serif',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                          backgroundColor: filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent',
                          fontWeight: filters[key] === opt ? 600 : 400,
                          color: filters[key] === opt ? 'var(--accent)' : 'var(--text-2)',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(62, 99, 86, 0.07)';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(62, 99, 86, 0.07)';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent';
                          e.currentTarget.style.color = filters[key] === opt ? 'var(--accent)' : 'var(--text-2)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.backgroundColor =
                            filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent';
                          e.currentTarget.style.color = filters[key] === opt ? 'var(--accent)' : 'var(--text-2)';
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {index < 3 && (
              <div
                style={{
                  width: '1px',
                  height: '34px',
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  marginRight: '16px',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--surface)',
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
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-dark)';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-dark)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
          }}
        >
          Rechercher
        </button>
      </form>
    </search>
  );
}

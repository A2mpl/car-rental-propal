'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ALL_PRICES, ALL_TYPES, FIELD_KEYS, type FieldKey, LABELS } from '@/components/ui/search/data';
import type { Filters } from '@/components/ui/search/types';
import { buildShopParams, getFilteredBrands, getFilteredModels } from '@/components/ui/search/utils';
import styles from './SearchBar.module.css';

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

  const handleSelect = (key: FieldKey, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'type') {
        next.brand = 'Toutes marques';
        next.model = 'Tous modèles';
      }
      if (key === 'brand') {
        next.model = 'Tous modèles';
      }
      return next;
    });
    setOpenMenu(null);
  };

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
    <search className={styles.searchWrap} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {FIELD_KEYS.map((key, index) => (
          <React.Fragment key={key}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>{LABELS[key]}</span>

              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
              >
                <span className={styles.triggerValue}>{filters[key]}</span>
                <ChevronDown size={13} className={`${styles.chevron} ${openMenu === key ? styles.chevronOpen : ''}`} />
              </button>

              <AnimatePresence>
                {openMenu === key && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {getOptions(key).map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        className={`${styles.option} ${filters[key] === opt ? styles.optionActive : ''}`}
                        onClick={() => handleSelect(key, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {index < 3 && <div className={styles.separator} />}
          </React.Fragment>
        ))}

        <button type="submit" className={styles.submitBtn}>
          Rechercher
        </button>
      </form>
    </search>
  );
}

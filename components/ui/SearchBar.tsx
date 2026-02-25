'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type VehicleType = 'Électrique' | 'Sport' | 'SUV' | 'Cabriolet';

interface ModelInfo {
    name: string;
    types: VehicleType[];
}

interface BrandInfo {
    models: ModelInfo[];
}

const VEHICLE_DATA: Record<string, BrandInfo> = {
    Audi: {
        models: [
            { name: 'RS6', types: ['Sport'] },
            { name: 'Q8', types: ['SUV'] },
            { name: 'e-tron GT', types: ['Électrique', 'Sport'] },
            { name: 'R8 Spyder', types: ['Sport', 'Cabriolet'] },
        ],
    },
    BMW: {
        models: [
            { name: 'M3', types: ['Sport'] },
            { name: 'M4 Cabriolet', types: ['Sport', 'Cabriolet'] },
            { name: 'X5', types: ['SUV'] },
            { name: 'iX', types: ['Électrique', 'SUV'] },
            { name: 'i4', types: ['Électrique', 'Sport'] },
        ],
    },
    Ferrari: {
        models: [
            { name: '296 GTB', types: ['Sport'] },
            { name: 'SF90 Stradale', types: ['Sport'] },
            { name: 'Roma Spider', types: ['Sport', 'Cabriolet'] },
            { name: 'Purosangue', types: ['SUV'] },
        ],
    },
    Lamborghini: {
        models: [
            { name: 'Huracán', types: ['Sport'] },
            { name: 'Huracán Spyder', types: ['Sport', 'Cabriolet'] },
            { name: 'Urus', types: ['SUV'] },
            { name: 'Revuelto', types: ['Sport'] },
        ],
    },
    McLaren: {
        models: [
            { name: '720S', types: ['Sport'] },
            { name: '720S Spider', types: ['Sport', 'Cabriolet'] },
            { name: 'Artura', types: ['Sport'] },
        ],
    },
    Mercedes: {
        models: [
            { name: 'AMG GT', types: ['Sport'] },
            { name: 'AMG GT Roadster', types: ['Sport', 'Cabriolet'] },
            { name: 'GLE Coupé', types: ['SUV'] },
            { name: 'EQS', types: ['Électrique'] },
            { name: 'Classe G', types: ['SUV'] },
        ],
    },
    Porsche: {
        models: [
            { name: '911 GT3', types: ['Sport'] },
            { name: '911 Cabriolet', types: ['Sport', 'Cabriolet'] },
            { name: 'Cayenne', types: ['SUV'] },
            { name: 'Taycan', types: ['Électrique', 'Sport'] },
            { name: '718 Boxster', types: ['Sport', 'Cabriolet'] },
        ],
    },
    Tesla: {
        models: [
            { name: 'Model 3', types: ['Électrique'] },
            { name: 'Model S', types: ['Électrique'] },
            { name: 'Model X', types: ['Électrique', 'SUV'] },
            { name: 'Model Y', types: ['Électrique', 'SUV'] },
        ],
    },
};

const ALL_TYPES: string[] = ['Tous', 'Électrique', 'Sport', 'SUV', 'Cabriolet'];
const ALL_PRICES: string[] = ['Tous les prix', '< €200/jour', '€200–500/jour', '> €500/jour'];

/* ══════════════════════════════════════════════
   Helpers pour le filtrage en cascade
   ══════════════════════════════════════════════ */
function getFilteredBrands(selectedType: string): string[] {
    const brands = Object.entries(VEHICLE_DATA)
        .filter(([, info]) => {
            if (selectedType === 'Tous') return true;
            return info.models.some((m) => m.types.includes(selectedType as VehicleType));
        })
        .map(([brand]) => brand);
    return ['Toutes marques', ...brands];
}

function getFilteredModels(selectedType: string, selectedBrand: string): string[] {
    let models: string[] = [];

    if (selectedBrand !== 'Toutes marques') {
        // Modèles de cette marque uniquement
        const brandData = VEHICLE_DATA[selectedBrand];
        if (brandData) {
            models = brandData.models
                .filter((m) => selectedType === 'Tous' || m.types.includes(selectedType as VehicleType))
                .map((m) => m.name);
        }
    } else {
        // Toutes les marques → tous les modèles filtrés par type
        models = Object.values(VEHICLE_DATA).flatMap((info) =>
            info.models
                .filter((m) => selectedType === 'Tous' || m.types.includes(selectedType as VehicleType))
                .map((m) => m.name),
        );
    }

    return ['Tous modèles', ...models];
}

/* ══════════════════════════════════════════════
   Filters type & URL builder
   ══════════════════════════════════════════════ */
interface Filters {
    type: string;
    brand: string;
    model: string;
    price: string;
}

function buildShopParams(filters: Filters): URLSearchParams {
    const p = new URLSearchParams();

    switch (filters.type) {
        case 'Électrique':   p.append('fuels', 'electric'); break;
        case 'Sport':        p.append('bodies', 'sport'); p.append('bodies', 'supercar'); break;
        case 'SUV':          p.append('bodies', 'suv'); break;
        case 'Cabriolet':    p.append('bodies', 'convertible'); break;
    }

    if (filters.brand !== 'Toutes marques') p.append('makes', filters.brand);
    if (filters.model !== 'Tous modèles') p.set('search', filters.model);

    if (filters.price === '< €200/jour')       { p.set('priceTo', '200'); }
    else if (filters.price === '€200–500/jour') { p.set('priceFrom', '200'); p.set('priceTo', '500'); }
    else if (filters.price === '> €500/jour')   { p.set('priceFrom', '500'); }

    return p;
}

/* ══════════════════════════════════════════════
   Composant SearchBar
   ══════════════════════════════════════════════ */
const FIELD_KEYS = ['type', 'brand', 'model', 'price'] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

const LABELS: Record<FieldKey, string> = {
    type: 'Type',
    brand: 'Marque',
    model: 'Modèle',
    price: 'Prix',
};

export default function SearchBar() {
    const router = useRouter();
    const [filters, setFilters] = useState<Filters>({
        type: 'Tous',
        brand: 'Toutes marques',
        model: 'Tous modèles',
        price: 'Tous les prix',
    });
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    /* ── Options dynamiques en cascade ── */
    const availableBrands = getFilteredBrands(filters.type);
    const availableModels = getFilteredModels(filters.type, filters.brand);

    const getOptions = (key: FieldKey): string[] => {
        switch (key) {
            case 'type':  return ALL_TYPES;
            case 'brand': return availableBrands;
            case 'model': return availableModels;
            case 'price': return ALL_PRICES;
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
                    backgroundColor: 'rgba(255, 255, 255, 0.88)',
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
                            {/* Label */}
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

                            {/* Bouton trigger */}
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

                            {/* ── Dropdown (plus compact) ── */}
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
                                            boxShadow:
                                                '0 12px 28px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(0, 0, 0, 0.05)',
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
                                                    backgroundColor:
                                                        filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent',
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
                                                    e.currentTarget.style.color =
                                                        filters[key] === opt ? 'var(--accent)' : 'var(--text-2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.backgroundColor =
                                                        filters[key] === opt ? 'rgba(62, 99, 86, 0.07)' : 'transparent';
                                                    e.currentTarget.style.color =
                                                        filters[key] === opt ? 'var(--accent)' : 'var(--text-2)';
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Séparateur */}
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

                {/* Bouton Rechercher */}
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
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-dark)'; }}
                    onFocus={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-dark)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
                    onBlur={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
                >
                    Rechercher
                </button>
            </form>
        </search>
    );
}
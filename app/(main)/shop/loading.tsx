import ShopLoadingSection from '@/components/shop/loading/ShopLoadingSection';
/**
 * Next.js App Router loading segment — displayed automatically while the
 * async ShopPage server component is streaming its response (e.g. during
 * filter changes that trigger a full server re-render).
 */
export default function ShopLoading() {
  return <ShopLoadingSection />;
}

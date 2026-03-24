import GiftCardForm from '@/components/admin/GiftCardForm';

export const metadata = { title: 'New Gift Card | Admin' };

export default function NewGiftCardPage() {
  return <GiftCardForm isEdit={false} />;
}

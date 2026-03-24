import GiftCardForm from '@/components/admin/GiftCardForm';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';

export const metadata = { title: 'Edit Gift Card | Admin' };

export default async function EditGiftCardPage({ params }) {
  await dbConnect();
  const giftCard = await GiftCard.findById(params.id).lean();

  if (!giftCard) return <div>Gift Card not found</div>;

  return <GiftCardForm initialData={JSON.parse(JSON.stringify(giftCard))} isEdit={true} />;
}

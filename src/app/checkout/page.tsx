import { OrderForm } from '@/components/order-form';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}

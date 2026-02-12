"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Home } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const order = orders.find((o: any) => o.reference === reference);
    setOrderDetails(order);
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-sm">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Reference Number */}
        {reference && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Transaction Reference</p>
            <p className="font-mono text-sm font-medium text-gray-900 break-all">
              {reference}
            </p>
          </div>
        )}

        {/* Order Details */}
        {orderDetails && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {orderDetails.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">{orderDetails.items.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total Paid</span>
                <span>₦{orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-3">
                Delivery Details
              </h4>
              <div className="text-sm space-y-1 text-gray-600">
                <p>
                  <strong>Name:</strong> {orderDetails.customer.firstName}{" "}
                  {orderDetails.customer.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {orderDetails.customer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {orderDetails.customer.phone}
                </p>
                <p>
                  <strong>Address:</strong> {orderDetails.customer.address}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/products" className="block">
            <Button className="w-full" size="lg">
              <Home className="mr-2" size={18} />
              Continue Shopping
            </Button>
          </Link>

          <Link href="/orders" className="block">
            <Button variant="outline" className="w-full" size="lg">
              <Package className="mr-2" size={18} />
              View My Orders
            </Button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 text-center mt-6">
          A confirmation has been saved to your order history.
        </p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}

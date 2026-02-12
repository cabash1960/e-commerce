"use client";
import { useCartStore } from "@/store/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "@/lib/checkout";
import { PaystackButton } from "react-paystack";
import Image from "next/image";

function Payment() {
  const { items, clearItems } = useCartStore();
  const router = useRouter();
  const [vatRate] = useState(0.075);

  // Calculations
  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const vat = subTotal * vatRate;
  const total = subTotal + vat;

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "ng" },
  });

  const email = watch("email");

  // Handle payment button click - validate first!
  const handlePaymentClick = async () => {
    // Trigger validation
    const isValid = await trigger();

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return false; // Prevent Paystack from opening
    }

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return false;
    }

    return true; // Allow Paystack to open
  };

  // Paystack config
  const componentProps = {
    email: email || "test@example.com",
    amount: Math.round(total * 100),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    text: `Pay ₦${total.toFixed(2)}`,
    currency: "NGN",
    reference: `ORDER-${Date.now()}`,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${watch("firstName") || ""} ${watch("lastName") || ""}`,
        },
      ],
    },
    onSuccess: (reference: any) => {
      console.log("Payment successful!", reference);
      toast.success("Payment successful! 🎉");

      const order = {
        reference: reference.reference,
        items,
        total,
        customer: watch(),
        timestamp: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      clearItems();
      router.push(`/order-success?ref=${reference.reference}`);
    },
    onClose: () => {
      toast.info("Payment window closed");
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6">Customer Information</h2>

            <FieldGroup>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </Field>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <FieldDescription>
                  Receipt will be sent to this email
                </FieldDescription>
              </Field>

              {/* Phone & Country */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="phone">
                    Phone <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <Select
                    defaultValue="ng"
                    onValueChange={(value) => setValue("country", value)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ng">Nigeria</SelectItem>
                      <SelectItem value="gh">Ghana</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="za">South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...register("address")}
                  id="address"
                  type="text"
                  placeholder="123 Main Street, Apartment 4B"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </Field>

              {/* Test Mode Notice */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="font-bold text-yellow-900 text-sm mb-1">
                  🧪 Test Mode
                </p>
                <p className="text-sm text-yellow-800">
                  Card:{" "}
                  <code className="bg-yellow-100 px-1">
                    4084 0840 8408 4081
                  </code>
                </p>
                <p className="text-sm text-yellow-800">
                  CVV: 123 | Expiry: 12/25
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/cart")}
                  className="flex-1"
                >
                  Back to Cart
                </Button>

                {/* Simple PaystackButton - always visible */}
                <button
                  onClick={async (e) => {
                    const canProceed = await handlePaymentClick();
                    if (!canProceed) {
                      e.preventDefault();
                    }
                  }}
                  className="flex-1"
                >
                  <PaystackButton
                    className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                    {...componentProps}
                  />
                </button>
              </div>
            </FieldGroup>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Button onClick={() => router.push("/products")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ₦{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₦{subTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VAT (7.5%)</span>
                      <span className="font-medium">₦{vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₦{total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

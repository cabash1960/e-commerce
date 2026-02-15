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
import Image from "next/image";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false },
);

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
    text: `Pay ₦${total.toLocaleString()}`,
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
    <section className="min-h-screen px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 border border-[#b5afa7] bg-white p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
              Customer Information
            </h2>

            <FieldGroup>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="firstName"
                    className="text-sm md:text-base"
                  >
                    First Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="border-[#b5afa7] focus:ring-[#0a0a0a]"
                  />
                  {errors.firstName && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="lastName"
                    className="text-sm md:text-base"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="border-[#b5afa7] focus:ring-[#0a0a0a]"
                  />
                  {errors.lastName && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </Field>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email" className="text-sm md:text-base">
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="border-[#b5afa7] focus:ring-[#0a0a0a]"
                />
                {errors.email && (
                  <p className="text-xs md:text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
                <FieldDescription className="text-xs md:text-sm">
                  Receipt will be sent to this email
                </FieldDescription>
              </Field>

              {/* Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="phone" className="text-sm md:text-base">
                    Phone <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    className="border-[#b5afa7] focus:ring-[#0a0a0a]"
                  />
                  {errors.phone && (
                    <p className="text-xs md:text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="country"
                    className="text-sm md:text-base"
                  >
                    Country
                  </FieldLabel>
                  <Select
                    defaultValue="ng"
                    onValueChange={(value) => setValue("country", value)}
                  >
                    <SelectTrigger id="country" className="border-[#b5afa7]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ng">🇳🇬 Nigeria</SelectItem>
                      <SelectItem value="gh">🇬🇭 Ghana</SelectItem>
                      <SelectItem value="ke">🇰🇪 Kenya</SelectItem>
                      <SelectItem value="za">🇿🇦 South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="address" className="text-sm md:text-base">
                  Address <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...register("address")}
                  id="address"
                  type="text"
                  placeholder="123 Main Street, Apartment 4B"
                  className="border-[#b5afa7] focus:ring-[#0a0a0a]"
                />
                {errors.address && (
                  <p className="text-xs md:text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </Field>

              {/* Test Mode Notice */}
              <div className="bg-[#fff8e1] border border-[#ffd54f] p-3 md:p-4 rounded-lg">
                <p className="font-bold text-[#f57c00] text-xs md:text-sm mb-1">
                  🧪 Test Mode Active
                </p>
                <p className="text-xs md:text-sm text-[#e65100]">
                  Card:{" "}
                  <code className="bg-[#fff3e0] px-1 py-0.5 rounded text-xs">
                    4084 0840 8408 4081
                  </code>
                </p>
                <p className="text-xs md:text-sm text-[#e65100]">
                  CVV: <span className="font-mono">123</span> | Expiry:{" "}
                  <span className="font-mono">12/25</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/carts")}
                  className="flex-1 border-[#b5afa7] hover:bg-[#b5afa7] hover:text-white transition-colors"
                >
                  Back to Cart
                </Button>

                {/* PaystackButton */}
                <div
                  onClick={async (e) => {
                    const canProceed = await handlePaymentClick();
                    if (!canProceed) {
                      e.preventDefault();
                    }
                  }}
                  className="flex-1"
                >
                  <PaystackButton
                    className="w-full bg-[#0a0a0a] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-sm md:text-base"
                    {...componentProps}
                  />
                </div>
              </div>
            </FieldGroup>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[#b5afa7] bg-white p-4 md:p-6 rounded-lg sticky top-4">
              <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-900">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4 text-sm md:text-base">
                    Your cart is empty
                  </p>
                  <Button
                    onClick={() => router.push("/products")}
                    className="bg-[#0a0a0a] hover:bg-gray-800"
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover w-12 h-12 md:w-[60px] md:h-[60px] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-xs md:text-sm font-medium whitespace-nowrap">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#b5afa7] pt-4 space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₦{subTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">VAT (7.5%)</span>
                      <span className="font-medium">
                        ₦{vat.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t border-[#b5afa7] pt-2 flex justify-between font-bold text-base md:text-lg">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;

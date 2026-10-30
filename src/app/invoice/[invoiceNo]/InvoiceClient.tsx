"use client";

import { Barcode } from "@/components/Barcode";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderInvoice, ShippingLocation } from "@/types";
import { Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useRef, useState } from "react";

interface InvoiceClientProps {
  invoice: OrderInvoice;
  invoiceNo: string;
}

function formatInvoiceDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours24 = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";

  return `${day}-${month}-${year} ${hours24}:${minutes}${ampm}`;
}

export default function InvoiceClient({ invoice, invoiceNo }: InvoiceClientProps) {
  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [origin, setOrigin] = useState("");

  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Delivery location label
  const deliveryLocationName = useMemo(() => {
    if (!invoice) return "Dhaka (Inside City)";
    const loc = locations.find((l) => l.id === invoice.location_id);
    if (loc) return loc.location;
    if (invoice.location_id === 14) return "Dhaka (Inside City)";
    if (invoice.location_id === 15) return "Dhaka (Outside City)";
    return invoice.location_id ? `District #${invoice.location_id}` : "Dhaka (Inside City)";
  }, [invoice, locations]);

  // Payment details
  const payment = invoice?.payments?.[0];
  const paymentMethodName = useMemo(() => {
    if (!payment) return "Cash On Delivery";
    if (payment.method_id === 2) return "Cash On Delivery";
    if (payment.method_id === 3) return "bKash / Mobile Banking";
    if (payment.method_id === 1) return "Credit / Debit Card";
    return "Cash On Delivery";
  }, [payment]);

  const isPaymentVerified = payment?.status === 1;
  const paymentNumber = payment?.trxn_id || (invoice ? `ilm${invoice.invoice}.81146880` : "");
  const invoiceTrackingUrl = `${origin}/invoice/${invoiceNo}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current || !invoice) return;
    setIsDownloadingPdf(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoice.invoice}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <>
      {/* Print Stylesheet: prints ONLY the invoice document card */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body * {
            visibility: hidden;
          }
          #invoice-printable,
          #invoice-printable * {
            visibility: visible;
          }
          #invoice-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
          }
          .no-print,
          header,
          footer,
          [data-nextjs-toploader] {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full min-h-screen dark:bg-[#121212] py-8 sm:py-12 text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors">
        <div className="container">
          {/* 1. Success Title & Order Message (no-print) */}
          <div className="text-center space-y-4 mb-6 no-print">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
              Your order has been successfully placed!
            </h1>
            <div className="text-left text-xs text-[#555555] dark:text-[#A0A0A0] leading-relaxed space-y-2">
              <p>
                Thank you so much for ordering us. Our representative will confirm the order by contacting you within
                the maximum 24 hours. If your order no:{" "}
                <span className="font-semibold text-[#111] dark:text-[#EEE]">{invoice.invoice}</span> is confirmed then
                we will reach your product. You can also review the product if you want to verify it.
              </p>
              <p>
                Wellsell BD always considers the quality of the product and its acceptability to the customer. In that
                continuation, we promise you always good products. Even then, if the product is broken / damaged / bad,
                or if the quality is not expected, then we request you to let us know within 24 hours of receiving the
                product.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* 3. Ordering Information Details Card (no-print) */}
            <Card className="not-print">
              <CardHeader>Ordering Information</CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-xs">
                  {/* Left Column */}
                  <div className="space-y-2.5">
                    <div className="flex items-start">
                      <span className="w-28 shrink-0 text-[#666] dark:text-[#888]">Name</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">{invoice.shipping_name}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-28 shrink-0 text-[#666] dark:text-[#888]">Mobile Number</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1 font-mono">
                        {invoice.shipping_phone}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-28 shrink-0 text-[#666] dark:text-[#888]">Email</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">
                        {(invoice as any).customer?.email || (invoice as any).shipping_email || ""}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-28 shrink-0 text-[#666] dark:text-[#888]">Address</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1 leading-snug">
                        {invoice.shipping_address}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-28 shrink-0 text-[#666] dark:text-[#888]">Delivery Type</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1 capitalize">
                        {invoice.shipment_type}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2.5">
                    <div className="flex items-start">
                      <span className="w-32 shrink-0 text-[#666] dark:text-[#888]">Delivery Location</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">{deliveryLocationName}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 shrink-0 text-[#666] dark:text-[#888]">Payment Type</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">{paymentMethodName}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 shrink-0 text-[#666] dark:text-[#888]">Payment Status</span>
                      <span className="mx-2 text-[#666] dark:text-[#888]">:</span>
                      <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">
                        {isPaymentVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="no-print">
                <div className="flex items-center justify-between">
                  <span>Your Bill</span>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group disabled:opacity-50"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#555] group-hover:text-primary" />
                      <span className="underline underline-offset-2">
                        {isDownloadingPdf ? "Saving PDF..." : "Save as PDF"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#555] group-hover:text-primary" />
                      <span className="underline underline-offset-2">Print Invoice</span>
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 6. Invoice Document Paper Card (#invoice-printable) */}
                <div
                  id="invoice-printable"
                  ref={invoiceRef}
                  className="bg-white text-[#111111] border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-12 relative overflow-hidden max-w-[760px] mx-auto"
                >
                  {/* Watermark in background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
                    <div className="text-center transform -rotate-12">
                      <img
                        src="https://wellsellbd.com/images/logo.svg?dummy=59825993"
                        alt=""
                        className="w-80 h-auto mx-auto filter grayscale"
                      />
                      <div className="text-4xl font-black uppercase tracking-widest text-[#000000] mt-3">
                        WELLSELL BD
                      </div>
                      <div className="text-base font-semibold tracking-wider text-[#000000]">Health &amp; Beauty</div>
                    </div>
                  </div>

                  {/* Top Store Header */}
                  <div className="flex items-start justify-between gap-4 pb-4">
                    <div className="flex items-start gap-3">
                      <img
                        src="https://wellsellbd.com/images/logo.svg?dummy=59825993"
                        alt="WellSell BD"
                        className="h-10 sm:h-12 w-auto object-contain shrink-0"
                      />
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] leading-tight">Wellsell BD</h2>
                        <p className="text-[11px] text-[#444444] leading-snug mt-1">
                          Gulshan-1, Navana Tower Shopping Complex, 4th flore, Shop No-18, Dhaka, Bangladesh
                        </p>
                        <p className="text-[11px] text-[#444444] leading-snug">+8801894084242 | info@wellsellbd.com</p>
                      </div>
                    </div>

                    {/* QR Code on top right */}
                    <div className="border border-[#777777] p-1 bg-white shrink-0">
                      <QRCodeSVG value={invoiceTrackingUrl} size={64} level="M" />
                    </div>
                  </div>

                  {/* INVOICE Title */}
                  <div className="my-3">
                    <h3 className="text-3xl sm:text-4xl font-serif tracking-[0.2em] text-[#286638] uppercase">
                      INVOICE
                    </h3>
                  </div>

                  {/* Barcode Section for Invoice No */}
                  <div className="mb-6 space-y-0.5">
                    <div className="font-bold text-lg text-[#111111] tracking-wide">#{invoice.invoice}</div>
                    <Barcode value={invoice.invoice} width={1.4} height={36} className="my-1 block" />
                    <div className="text-[11px] text-[#555555] tracking-widest font-mono">{invoice.invoice}</div>
                  </div>

                  {/* Details Row: Metadata on left & Ship To on right */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#222222] mb-6">
                    {/* Left Column */}
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="w-24 shrink-0 text-[#555555]">Issue Date</span>
                        <span className="mr-2 text-[#555555]">:</span>
                        <span className="font-mono">{formatInvoiceDate(invoice.created_at)}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 shrink-0 text-[#555555]">Ordering Date</span>
                        <span className="mr-2 text-[#555555]">:</span>
                        <span className="font-mono">{formatInvoiceDate(invoice.created_at)}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 shrink-0 text-[#555555]">Currency</span>
                        <span className="mr-2 text-[#555555]">:</span>
                        <span>Tk.</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 shrink-0 text-[#555555]">Payment Type</span>
                        <span className="mr-2 text-[#555555]">:</span>
                        <span>{paymentMethodName}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 shrink-0 text-[#555555]">Issuer</span>
                        <span className="mr-2 text-[#555555]">:</span>
                        <span>
                          {invoice.shipping_name}, {invoice.shipping_phone}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Ship To */}
                    <div className="space-y-1">
                      <div className="font-bold underline mb-1">Ship To:</div>
                      <div className="font-bold">{invoice.shipping_name}</div>
                      <div className="leading-snug text-[#333333]">{invoice.shipping_address}</div>
                      <div>
                        Delivery Location: <span className="font-medium">{deliveryLocationName}</span>
                      </div>
                      <div className="font-mono">{invoice.shipping_phone}</div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-y border-[#333333] text-[#111111]">
                          <th className="py-2.5 px-2 w-10 font-bold">#</th>
                          <th className="py-2.5 px-2 font-bold">Product Description</th>
                          <th className="py-2.5 px-2 text-center w-24 font-bold">Quantity</th>
                          <th className="py-2.5 px-2 text-center w-28 font-bold">Unit Price</th>
                          <th className="py-2.5 px-2 text-right w-28 font-bold">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {invoice.items.map((item, idx) => {
                          let variantObj: any = null;
                          try {
                            variantObj =
                              typeof item.variant_info === "string" ? JSON.parse(item.variant_info) : item.variant_info;
                          } catch {}

                          return (
                            <tr key={item.id || idx}>
                              <td className="py-3 px-2 align-top text-[#555555]">{idx + 1}</td>
                              <td className="py-3 px-2 align-top">
                                <div className="font-bold text-[#111111] leading-snug">{item.product_name}</div>
                                <div className="text-[10px] text-[#666666] mt-0.5 flex items-center gap-2">
                                  <span>ID: {item.product_id}</span>
                                  {variantObj?.size && <span>· Size: {variantObj.size}</span>}
                                  {variantObj?.color && <span>· Color: {variantObj.color}</span>}
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center align-top font-mono">{item.quantity}</td>
                              <td className="py-3 px-2 text-center align-top font-mono">
                                Tk.{Number(item.unit_price).toLocaleString()}
                              </td>
                              <td className="py-3 px-2 text-right align-top font-mono font-medium">
                                Tk.{Number(item.price_total).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Summary */}
                  <div className="flex justify-end my-4">
                    <div className="w-56 space-y-1.5 text-xs">
                      <div className="flex justify-between text-[#333333]">
                        <span>Total</span>
                        <span className="font-mono">Tk.{Number(invoice.total_cart_item_price).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#333333]">
                        <span>Delivery Cost</span>
                        <span className="font-mono">Tk.{Number(invoice.total_shipping_cost).toLocaleString()}</span>
                      </div>
                      {Number(invoice.total_discount) > 0 && (
                        <div className="flex justify-between text-[#1F6E54]">
                          <span>Discount</span>
                          <span className="font-mono">-Tk.{Number(invoice.total_discount).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-b border-dotted border-[#666666] my-1" />
                      <div className="flex justify-between font-bold text-xs text-[#286638]">
                        <span>Subtotal</span>
                        <span className="font-mono">Tk.{Number(invoice.subtotal).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Number and Barcode */}
                  <div className="mt-6 mb-4">
                    <div className="text-xs text-[#333333] mb-1">
                      Payment Number: <span className="font-mono">{paymentNumber}</span>
                    </div>
                    <Barcode value={paymentNumber} width={1.2} height={28} className="my-1 block" />
                    <div className="text-[10px] text-[#555555] font-mono tracking-wider">{paymentNumber}</div>
                  </div>

                  {/* Satisfaction Notice Footer */}
                  <div className="text-[10px] text-[#555555] leading-relaxed space-y-1 pt-2 border-t border-[#F0F0F0]">
                    <p className="font-bold text-[#222222]">Your complete satisfaction</p>
                    <p>We want to make sure that your are completely satisfied with Wellsell BD.</p>
                    <p>
                      Delivery: If for any reason you are not, then please advise the Customer Services Team Member at
                      the door and they will ensure that any issues will be resolve for you.
                    </p>
                    <p>
                      If there are any questions you&apos;d like to ask, either about your order or any aspect of the
                      Wellsell BD service, Please call us on +8801894084242, or e-mail us at info@wellsellbd.com. We are
                      open seven days a week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

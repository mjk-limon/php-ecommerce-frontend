"use client";

import Invoice from "@/components/order/Invoice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderInvoice } from "@/types";
import { Printer } from "lucide-react";
import { useMemo, useState } from "react";

interface InvoiceClientProps {
  invoice: OrderInvoice;
  invoiceNo: string;
}

export default function InvoiceClient({ invoice, invoiceNo }: InvoiceClientProps) {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

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

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(document.getElementById("invoice-printable"), {
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
    <div className="w-full min-h-screen dark:bg-[#121212] py-8 sm:py-12 text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors">
      <div className="container">
        {/* 1. Success Title & Order Message (no-print) */}
        <div className="text-center space-y-4 mb-6 no-print">
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
            Your order has been successfully placed!
          </h1>
          <div className="text-left text-xs text-[#555555] dark:text-[#A0A0A0] leading-relaxed space-y-2">
            <p>
              Thank you so much for ordering us. Our representative will confirm the order by contacting you within the
              maximum 24 hours. If your order no:{" "}
              <span className="font-semibold text-[#111] dark:text-[#EEE]">{invoice.invoice}</span> is confirmed then we
              will reach your product. You can also review the product if you want to verify it.
            </p>
            <p>
              Wellsell BD always considers the quality of the product and its acceptability to the customer. In that
              continuation, we promise you always good products. Even then, if the product is broken / damaged / bad, or
              if the quality is not expected, then we request you to let us know within 24 hours of receiving the
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
                    <span className="font-medium text-[#111] dark:text-[#EEE] flex-1">{invoice.location.location}</span>
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
                <div className="flex divide-x">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="flex items-center gap-1.5 px-4 hover:text-primary transition-colors cursor-pointer group disabled:opacity-50"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#555] group-hover:text-primary" />
                    <span>{isDownloadingPdf ? "Saving PDF..." : "Save as PDF"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      window.open(`${window.location.href.replace(/\/$/, "")}/print`, "_blank");
                    }}
                    className="flex items-center gap-1.5 px-4 hover:text-primary transition-colors cursor-pointer group"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#555] group-hover:text-primary" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                id="invoice-printable"
                className="bg-white text-[#111111] border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-12 relative overflow-hidden max-w-190 mx-auto"
              >
                <Invoice invoice={invoice} invoiceNo={invoiceNo} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

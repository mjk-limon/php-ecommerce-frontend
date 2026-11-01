import "@/app/globals.css";
import Invoice from "@/components/order/Invoice";
import { serverApiGet } from "@/services/serverApi";
import type { Metadata } from "next";
import Script from "next/script";

interface PageProps {
  params: Promise<{ invoiceNo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { invoiceNo } = await params;

  return {
    title: `Print Invoice #${invoiceNo} | WellSell BD`,
    robots: { index: false, follow: false },
  };
}

export default async function InvoicePrintPage({ params }: PageProps) {
  const { invoiceNo } = await params;
  const { data: invoice } = await serverApiGet<any>("order/invoice", { invoice: invoiceNo });

  return (
    <>
      <Invoice invoice={invoice} invoiceNo={invoiceNo} />
      <Script id="print-invoice" strategy="afterInteractive">
        {"window.print();window.close();"}
      </Script>
    </>
  );
}

import { serverApiGet } from "@/services/serverApi";
import type { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";

interface PageProps {
  params: Promise<{ invoiceNo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { invoiceNo } = await params;

  return {
    title: `Invoice #${invoiceNo} | WellSell BD`,
    description: `Official invoice receipt #${invoiceNo} for WellSell BD purchase.`,
  };
}

export default async function InvoicePage({ params }: PageProps) {
  const { invoiceNo } = await params;
  const { data: invoice } = await serverApiGet<any>("order/invoice", { invoice: invoiceNo });

  return <InvoiceClient invoice={invoice} invoiceNo={invoiceNo} />;
}

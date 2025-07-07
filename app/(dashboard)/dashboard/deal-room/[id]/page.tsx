import CoreService from '@/services/core.service';
import InvestorOverviewContent from '@/components/dashboard/deal-room/InvestorOverviewContent';
import { notFound } from 'next/navigation';

export default async function InvestorOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const investor = await CoreService.getInvestorById(id);

  if (!investor) {
    notFound();
  }

  return (
    <div>
      <InvestorOverviewContent investor={investor} />
    </div>
  );
}

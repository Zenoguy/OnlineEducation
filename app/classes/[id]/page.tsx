import ClassDetailClient from './class-detail-client';

interface ClassDetailPageProps {
  params: {
    id: string;
  };
}

export default function ClassDetailPage({ params }: ClassDetailPageProps) {
  return <ClassDetailClient id={params.id} />;
}
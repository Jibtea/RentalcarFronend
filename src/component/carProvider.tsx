import Link from "next/link";


type Props = {
  name: string,
  address: string,
  province: string,
  tel: string,
  pid: string
};

export default function CarProviderCard({ name, address, province, tel, pid }: Props) {
  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md p-6 w-[90%] max-w-xl mx-auto mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-sm"><span className="font-medium">Address:</span> {address}</p>
      <p className="text-sm"><span className="font-medium">Province:</span> {province}</p>
      <p className="text-sm"><span className="font-medium">Tel:</span> {tel}</p>
      <Link href={`/providers/${pid}`}>
        check this provider
      </Link>
    </div>
  );
}
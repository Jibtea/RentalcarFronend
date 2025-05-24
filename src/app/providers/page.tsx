'use client'
import getCarProviders from "@/libs/getCarProviders"
import CarProviderCard from "@/component/carProvider"
import { useEffect, useState } from "react";



export default function ProvidersPage() {
  const [carProviders, setCarProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCarProviders()
      .then((response) => {
        // response is the whole object { success, count, data }
        setCarProviders(response.data);  // <-- use response.data (the array)
        setLoading(false);
        // console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  if (loading) return <p className="w-[100%] h-[100%]">Loading car providers...</p>;


  return (
    <div className="flex flex-col items-center pt-10 space-y-4 w-[90%] h-[100%]">
      <h1>Car Providers</h1>
      {carProviders.map((provider: any) => (
        <CarProviderCard
          // key={provider.id}
          name={provider.name}
          address={provider.address}
          province={provider.province}
          tel={provider.tel}
          pid={provider._id}
        />
      ))}
    </div>
  );
}
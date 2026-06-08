"use client";
interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt?: number;
}
export default function Test({data} : {data : LinkItem[]}) {
    
    return <div>
            {data?.map(item => <div key={item.id}>{item.id}</div>)}
    </div>;
}
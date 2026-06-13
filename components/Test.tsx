import { LinkItem } from "@/app/generated/prisma/client";

export default function Test({data} : {data : LinkItem[]}) {
    
    return <div>
            {data?.map(item => <div key={item.id}>{item.id}</div>)}
    </div>;
}
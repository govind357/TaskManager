type Props={
    params:Promise<{id:string}>
}

export default async function routing({params}:Props){

    const {id}=await params
    console.log(id);
    
}
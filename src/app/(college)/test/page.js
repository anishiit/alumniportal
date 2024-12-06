export default function TestPage() {

    // useEffect(() => {
    //     console.log("test")
    //     console.log(process.env.LINKEDIN_CLIENT_ID)
    // },[])

    return (
        <>
        <div>
            hi
            {process.env.LINKEDIN_CLIENT_ID}
        </div>
        </>
    )
}
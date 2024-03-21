import { useMediaQuery } from "@uidotdev/usehooks";
import '../../../input.css'

export default function Prizes() {
    const isPhone = useMediaQuery("only screen and (max-width : 768px)");

    const prizes = [
        {
            id: 0,
            title: "1 Место",
            imgUrl: "src/img/1place.png",
            prizePool: '250.000 KZT',
            hidden: !isPhone,
        },
        {
            id: 1,
            title: "2 Место",
            imgUrl: "src/img/2place.png",
            prizePool: '150.000 KZT',
            hidden: false,
        },
        {
            id: 2,
            title: "1 Место",
            imgUrl: "src/img/1place.png",
            prizePool: '250.000 KZT',
            hidden: isPhone,
        },
        {
            id: 3,
            title: "3 Место",
            imgUrl: "src/img/3place.png",
            prizePool: '100.000 KZT',
            hidden: false,
        }
    ];

    return (
        <div>
            <header id="key-events" className="text-white p-4">
                <h1 className="text-3xl font-bold text-center">Призовой фонд</h1>
            </header>
            <section className="flex justify-center" style={{ paddingTop: 5, paddingBottom: 20 }}>
                {isPhone ? <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {prizes.map(prize => (
                        <div className="max-w-sm bg-inheritrounded-lg shadow" style={{ borderRadius: 10 }} key={prize.id} hidden={prize.hidden} >
                            <div><img className="rounded-t-lg w-52 ml-4" src={prize.imgUrl} alt={prize.title} style={{ width: 200 }} />
                                <div className="bg-inherit p-2 flex flex-col justify-center ml-3 ring-offset-slate-50 ring-lime rounded-lg transition hover:scale-110">
                                    <div className="flex items-center justify-center  space-x-2">
                                        <span className="text-md text-white hover:underline">{prize.title}</span>
                                    </div>
                                    <p className="text-white text-md flex items-center justify-center ml-1">{prize.prizePool}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    {prizes.map(prize => (
                        <div className="max-w-sm bg-inheritrounded-lg shadow " style={{ borderRadius: 10 }} key={prize.id} hidden={prize.hidden}>
                            <div><img className="rounded-t-lg w-52 ml-4" src={prize.imgUrl} alt={prize.title} style={{ width: 200 }} />
                                <div className="bg-inherit p-2 flex flex-col justify-center ml-3 ring-offset-slate-50 ring-lime rounded-lg transition hover:scale-110">
                                    <div className="flex items-center justify-center  space-x-2">
                                        <span className="text-md text-white hover:underline">{prize.title}</span>
                                    </div>
                                    <p className="text-white text-md flex items-center justify-center ml-1">{prize.prizePool}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                }
            </section>
        </div>
    );

}
function LocalTimeTab({ index = 2, setIndex }: { index?: number, setIndex: (e: number) => void }) {

    const textClass = "text-center text-[10.5px] md:text-sm cursor-pointer  uppercase rounded-lg font-bold  h-full flex justify-center items-center";
    const activeClass = "bg-orange-500 text-white";
    return (
        <div className="sticky md:relative top-20 md:top-0 z-50 ">
            <div className="w-auto h-10 overflow-hidden rounded-lg mb-5 bg-white text-orange-400  items-center grid grid-cols-4 border-2 border-orange-100">
                <div className={`${textClass} ${index == 0 ? activeClass : ""}`} onClick={() => setIndex(0)}>4 hr | 40 Km</div>
                <div className={`${textClass} ${index == 1 ? activeClass : ""}`} onClick={() => setIndex(1)}>8 hr | 80 Km</div>
                <div className={`${textClass} ${index == 2 ? activeClass : ""}`} onClick={() => setIndex(2)}>12 hr | 120 Km</div>
                <div className={`${textClass} ${index == 3 ? activeClass : ""}`} onClick={() => setIndex(3)}>12 hr | 120 Km</div>
            </div>
        </div>
    )
}
export default LocalTimeTab
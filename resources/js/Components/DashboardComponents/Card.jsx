
export default function Card({ card }) {
    return (
                <div className="bg-gray-400 font-bold grid gap-5 min-w-[250px] min-h-[100px] rounded-lg p-5 text-white">
                    <div className="text-3xl">
                        {card.title}
                    </div>
                    <div className="text-right text-4xl">
                        {card.value}
                    </div>
                </div>
    );
}

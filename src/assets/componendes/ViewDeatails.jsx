import { useLocation, useNavigate } from 'react-router-dom';

export default function ViewDetails() {
    const location = useLocation();
    const { food } = location.state || {};
    const navigate = useNavigate();
    function back ()
    {
        navigate("/home")
    }

    if (!food) {
        return <p>No details available.</p>;
    }

    return (
        <section className="w-[100%] h-fit bg-gray-100 flex justify-center items-center">
            <div className="bg-white w-[90%] h-fit rounded-lg shadow-lg p-8">
                <div className="flex flex-col lg:flex-row">
                
                    <div className="lg:w-1/2 w-full flex justify-center items-center">
                        <img src={food.image} alt={food.label} className="rounded-lg mb-[290px] w-full h-[400px] max-h-96 object-cover" />
                        
                    </div>
                    <div className='w-[45%] h-[260px] rayu'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{food.label}</h1>
                        <p className="text-lg text-gray-600 mb-2"><strong>Source:</strong> {food.source}</p>
                        <p className="text-lg text-gray-600 mb-2"><strong>Calories:</strong> {Math.round(food.calories)} kcal</p>
                        <p className="text-lg text-gray-600 mb-2"><strong>Cuisine Type:</strong> {food.cuisineType}</p>
                        <p className="text-lg text-gray-600 mb-2"><strong>Meal Type:</strong> {food.mealType}</p>
                        <p className="text-lg text-gray-600 mb-2"><strong>Dish Type:</strong> {food.dishType}</p>   
                    </div>

          
                    <div className="lg:w-1/2 w-full lg:pl-8 mt-6 lg:mt-0">
                    <hr className='h-full'/>

                        

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients:</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                {food.ingredientLines.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Health Labels:</h2>
                            <div className="flex flex-wrap gap-2">
                                {food.healthLabels.map((label, index) => (
                                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

               
                        <div className="mt-6">
                            <a className="text-blue-500 underline cursor-pointer" onClick={back}>
                                back
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

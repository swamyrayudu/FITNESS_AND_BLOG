import Headers from './Headers';
import { Input } from '@/components/ui/input';
import { ContextUser } from '../contexts/Contextuser';
import { useContext, useEffect, useState } from 'react';
import Items from './Items';
import { Button } from '@/components/ui/button';

export default function Home() {
    const loggeddata = useContext(ContextUser);
    const [fooditems, setfooditems] = useState([]);
    const [food, setfood] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [searchClicked, setSearchClicked] = useState(false); // State to track if search button was clicked
    const app_id = '7482eb19';
    const app_key = 'f30c05848c0e37737bbb56765f214814';

    const searchFoodItems = (query) => {
        if (query.trim().length !== 0) {
            fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&q=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loggeddata.loginuser.token}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.hits && data.hits.length > 0) {
                    setfooditems(data.hits);
                } else {
                    setfooditems([]);
                }
                setSearchClicked(true); // Search button has been clicked
            })
            .catch((err) => {
                console.log(err);
                setfooditems([]);
            });
        } else {
            setfooditems([]);
            setSearchClicked(true);
        }
    };

    // Update searchQuery state when typing in input
    function handleInputChange(event) {
        setSearchQuery(event.target.value);
    }

    // Immediate search when clicking the search button
    function handleSearchClick() {
        if (searchQuery.trim() === "") {
            setfooditems([]);
        } else {
            searchFoodItems(searchQuery);
        }
    }

    function handleFoodItemClick(selectedFood) {
        setfood(selectedFood);
    }

    useEffect(() => {
        if (food) {
            console.log(food);
        }
    }, [food]);

    return (
        <>
            <div>
                <Headers />
            </div>
            <section className="w-full h-[653px] bg-gradient-to-bl from-white via-neutral-100 to-violet-400 flex flex-col items-center justify-center py-10 px-4">
                {/* Main Title and Location */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Discover Your Fitness</h1>
                    <h2 className="text-3xl font-medium text-gray-700">From Local Restaurant Foods</h2>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-md mb-8 flex">
                    <Input
                        required
                        placeholder="Search for food items"
                        className="w-[80%] h-12 px-4 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleInputChange}
                        type="search"
                        value={searchQuery}
                    />
                    <Button className='w-[20%] h-12 rounded-3xl ml-2' onClick={handleSearchClick}>Search</Button>
                </div>

                {/* Search Results */}
                {searchClicked && fooditems.length > 0 && (
                    <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-300 overflow-y-auto max-h-80 relative cursor-pointer">
                        {fooditems.map((item) => (
                            <div
                                className="cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                                key={item.recipe.uri}
                                onClick={() => handleFoodItemClick(item.recipe)}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{item.recipe.label}</h3>
                                <p className="text-sm text-gray-600 mt-1">{item.recipe.ingredients.length} ingredients</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Selected Food Item Details */}
                {food && (
                    <div className="w-full max-w-2xl mt-10 bg-white shadow-lg rounded-lg border border-gray-300 p-6">
                        <Items food={food} />
                    </div>
                )}
            </section>
        </>
    );
}

import { useContext, useEffect, useState } from 'react';
import Headers from './Headers';
import { ContextUser } from '../contexts/Contextuser';

export default function Food() {
  const { loginuser } = useContext(ContextUser); // Getting the logged-in user's data
  const [items, setItems] = useState([]); // State for the list of food items
  const [date, setDate] = useState(new Date()); // State for the selected date
  const [total, setTotal] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalFiber: 0,
  });
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for handling errors

  // Fetching data when date changes
  useEffect(() => {
    fetchFoodData();
  }, [date]);

  const fetchFoodData = async () => {
    setLoading(true);
    setError('');
    
    // Format the date as MM-DD-YYYY
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

    try {
      const response = await fetch(`http://localhost:9000/track/${loginuser.userid}/${formattedDate}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginuser.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch data`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setItems(data); // Set items if data is an array
      } else {
        setError('Unexpected data format received from server.');
        setItems([]); // Reset items if the data format is incorrect
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load food data. Please try again later.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate the total nutrients and calories from the fetched food items
  useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    let totalCopy = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalFiber: 0,
    };

    items.forEach((item) => {
      totalCopy.totalCalories += item.details.calories || 0;
      totalCopy.totalProtein += item.details.protein || 0;
      totalCopy.totalCarbs += item.details.carbohydrates || 0;
      totalCopy.totalFats += item.details.fat || 0;
      totalCopy.totalFiber += item.details.fiber || 0;
    });

    setTotal(totalCopy);
  };

  // Handle date input change and update the state
  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  return (
    <>
      <div>
        <Headers />
      </div>

      <section className="w-full h-[653px] bg-gray-100 flex">
        <div className="w-1/5 h-full bg-neutral-800 flex flex-col items-center p-4">
          <h2 className="text-white mb-4">Select Date</h2>
          <input
            type="date"
            className="text-black rounded p-2 cursor-pointer"
            value={date.toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
        </div>

        <section className="p-4 w-4/5 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500 mt-8">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-8">{error}</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div className="item mb-4 flex items-center bg-white p-4 rounded shadow-md" key={item._id}>
                {item.details.img && (
                  <img
                    src={item.details.img}
                    alt={item.details.name}
                    className="w-16 h-16 mr-4 object-cover rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.details.name} ({item.details.calories} Kcal for {item.quantity}g)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Protein: {item.details.protein}g, Carbs: {item.details.carbohydrates}g, Fats:{' '}
                    {item.details.fat}g, Fiber: {item.details.fiber}g
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No food data available for the selected date.</p>
          )}

          <div className="item mt-6 p-4 bg-blue-50 rounded shadow-md text-center">
            <h3 className="text-xl font-bold text-blue-800">{total.totalCalories} Kcal</h3>
            <p className="text-gray-700">
              Protein: {total.totalProtein}g, Carbs: {total.totalCarbs}g, Fats: {total.totalFats}g, Fiber:{' '}
              {total.totalFiber}g
            </p>
          </div>
        </section>
      </section>
    </>
  );
}

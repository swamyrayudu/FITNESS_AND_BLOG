import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useContext } from 'react';
import { ContextUser } from '../contexts/Contextuser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Items(props) {
  const navigate = useNavigate();
  const { loginuser } = useContext(ContextUser);

  const [eatenQuantity, setEatenQuantity] = useState(0);
  const [food, setFood] = useState(props.food);
  const [foodInitial, setFoodInitial] = useState({});

  const handleViewDetails = () => {
    navigate('/details', { state: { food } });
  };

  useEffect(() => {
    if (props.food && props.food.uri) {
      setFood(props.food);
      setFoodInitial(props.food);
    } else {
      console.error('Food data is missing uri:', props.food);
    }
  }, [props.food]);

  function calculateMacros(event) {
    const quantity = Number(event.target.value);

    // Ensure quantity is a valid number and non-negative
    if (!isNaN(quantity) && quantity >= 0) {
      setEatenQuantity(quantity);

      const totalNutrients = foodInitial.totalNutrients || {};
      const protein = (totalNutrients.PROCNT?.quantity || 0) * (quantity / food.totalWeight);
      const carbohydrates = (totalNutrients.CHOCDF?.quantity || 0) * (quantity / food.totalWeight);
      const fat = (totalNutrients.FAT?.quantity || 0) * (quantity / food.totalWeight);
      const fiber = (totalNutrients.FIBTG?.quantity || 0) * (quantity / food.totalWeight);
      
      // Calculate calories using Atwater method
      const calories = Math.round((protein * 4) + (carbohydrates * 4) + (fat * 9));

      // Update food object with rounded values
      setFood({
        ...food,
        protein: Math.round(protein),
        carbohydrates: Math.round(carbohydrates),
        fat: Math.round(fat),
        fiber: Math.round(fiber),
        calories: calories, // Set calculated calories
      });
    } else {
      toast.error('Please enter a valid quantity greater than or equal to zero.');
      setEatenQuantity(0);
    }
  }

  function trackFoodItem() {
    if (!food.uri) {
      console.error('Food URI is missing. Unable to track the item.');
      toast.error('Food URI is missing. Please check the food data.');
      return;
    }

    if (eatenQuantity <= 0) {
      toast.error('Please enter a valid quantity before tracking the food.');
      return;
    }

    const trackedItem = {
      userId: loginuser.userid,
      foodId: food.uri,
      details: {
        protein: food.protein || 0,
        carbohydrates: food.carbohydrates || 0,
        fat: food.fat || 0,
        fiber: food.fiber || 0,
        calories: food.calories || 0,
        name: food.label,
        img: food.image,
      },
      quantity: eatenQuantity,
    };

    fetch('http://localhost:9000/track', {
      method: 'POST',
      body: JSON.stringify(trackedItem),
      headers: {
        Authorization: `Bearer ${loginuser.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          toast.success('Food tracked successfully!');
        } else {
          console.log('Track response:', data);
        }
      })
      .catch((err) => {
        console.error('Error tracking food:', err);
        toast.error('Error tracking food. Please try again.');
      });
  }

  return (
    <div className="w-[100%] h-[300px] flex">
      <div className="w-[50%] h-[290px]">
        <div className="w-[100%] h-[290px] bg-neutral-100 shadow-xl rounded-md p-1">
          <img src={food.image} className="w-[100%] h-[240px]" alt={food.label} />
          <Button className="w-full h-[40px] rounded-none" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>

      <div className="w-[96%] h-[290px] bg-neutral-100 shadow-xl rounded-sm ml-3 flex justify-center items-center">
        <div className="w-[86%] h-[250px] p-4">
          <p className="font-semibold text-[18px] h-[55px] overflow-hidden">
            <span className="w-[30%] h-[20px] overflow-hidden">{food.label}</span> from (
            {eatenQuantity > 0 ? food.calories : '0'} kcal for {eatenQuantity} g)
          </p>
          <div className="w-[100%] h-[50px] mt-4 flex justify-between">
            <p className="font-bold w-[35%] h-[40px]">
              {foodInitial.totalNutrients?.PROCNT?.label || 'Protein'}: {food.protein || '0'}g
            </p>
            <p className="font-bold w-[35%] h-[40px]">
              {foodInitial.totalNutrients?.CHOCDF?.label || 'Carbs'}: {food.carbohydrates || '0'}g
            </p>
          </div>
          <div className="w-[100%] h-[50px] flex justify-between items-start">
            <p className="font-bold w-[30%] h-[40px]">
              {foodInitial.totalNutrients?.FAT?.label || 'Fat'}: {food.fat || '0'}g
            </p>
            <p className="font-bold w-[35%] h-[40px]">
              {foodInitial.totalNutrients?.FIBTG?.label || 'Fiber'}: {food.fiber || '0'}g
            </p>
          </div>
          <div className="w-[100%] h-[70px] flex">
            <Input
              className="w-[60%] h-[30px] mt-2"
              placeholder="Enter Grams"
              onChange={calculateMacros}
              required
              type="number"
              min="0"
            />
            <Button
              className="ml-2 h-[30px] mt-2 w-[30%]"
              onClick={trackFoodItem}
              disabled={eatenQuantity <= 0}
            >
              Track
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

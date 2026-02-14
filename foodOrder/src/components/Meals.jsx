import MealItem from "./MealItem";
import ErrorMessage from "./ErrorMessage";
import useRequestApi from "../hooks/useRequestApi";

const requestConfig = {};

export default function Meals() {
  const { data: loadMeals, error, loading } = useRequestApi(
    "http://localhost:3000/meals",
    requestConfig,
    [],
  );

  if (error) {
    return <ErrorMessage title="Failed to fetch meals" message={error} />;
  }
  
  if(loading){
    return <p className="center">Meals are loading...</p>
  }

  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

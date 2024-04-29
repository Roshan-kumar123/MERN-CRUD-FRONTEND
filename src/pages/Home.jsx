import { useEffect } from "react";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    // const localApiUrl = import.meta.env.VITE_APP_LOCAL_API_URL;
    const serverApiUrl = import.meta.env.VITE_APP_SERVER_API_URL;
    try {
      const fetchWorkouts = async () => {
        const response = await fetch(`${serverApiUrl}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      };

      if (user) {
        fetchWorkouts();
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

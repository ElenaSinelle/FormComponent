import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import "./Form.css";

interface FormData {
  firstName: string;
  lastName: string;
  tel: string;
  gender: string;
  checkedMeals: boolean[];
  photo: File | null;
  holidays: string;
}

const meals: string[] = ["pizza", "pasta", "borsch"];
const holidayChoices: string[] = [
  "hiking",
  "sunbathing on the beach",
  "city tours",
];

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    tel: "",
    gender: "male",
    checkedMeals: new Array(meals.length).fill(false),
    photo: null,
    holidays: holidayChoices[0],
  });

  const [data, setData] = useState<FormData | null>(null);
  const [photoPreview, setPhotoPreview] = useState<
    string | undefined
  >(undefined);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked, files } = e.target; // разбиваем e.target на атрибуты формы

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      const index = parseInt(name.split("-")[1]); // извлекаем индекс из имени чекбокса которое определено как name={`meal-${ind}`}
      setFormData(prevState => {
        const newCheckedMeals =
          prevState.checkedMeals.slice(); // поверхностная копия массива checkedMeals
        newCheckedMeals[index] = checked; // установка checked: true для внось выбранного чекбокса
        return {
          ...prevState,
          checkedMeals: newCheckedMeals,
        };
      });
      //этот кусок кода можно заменить на этот:
      // setFormData(prevState => {
      //   const newCheckedMeals = [...prevState.checkedMeals]; // поверхностная копия массива checkedMeals
      //   newCheckedMeals[index] = checked;
      //   return { ...prevState, checkedMeals: newCheckedMeals };
      // });
    } else if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      setFormData(prevState => ({
        ...prevState,
        photo: files ? files[0] : null,
      }));
    } else {
      const { value } = e.target as
        | HTMLInputElement
        | HTMLSelectElement;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.photo) {
      setPhotoPreview(URL.createObjectURL(formData.photo));
    }

    const submittedData = {
      ...formData,
      checkedMeals: meals.filter(
        (_, i) => formData.checkedMeals[i],
      ),
    };

    localStorage.setItem(
      "form",
      JSON.stringify(submittedData),
    );
    setData(submittedData);
  };

  const handleReset = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      tel: "",
      gender: "male",
      checkedMeals: new Array(meals.length).fill(false),
      photo: null,
      holidays: holidayChoices[0],
    });
    setPhotoPreview(undefined);
    setData(null);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      action="#"
      method="get"
    >
      <label>
        First Name*{" "}
        <input
          className="inputStyles"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
          required
        />
      </label>

      <label>
        Last Name*{" "}
        <input
          className="inputStyles"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
          required
        />
      </label>

      <label>
        Phone Number*{" "}
        <input
          className="inputStyles"
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          placeholder="Enter Your Phone Number"
          required
        />
      </label>

      <label className="radioStyles">
        Gender
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
      </label>

      <label className="fileStyles">
        Upload Your Photo
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          placeholder="Upload File"
        />
      </label>

      <label className="checkboxStyles">
        Favorite Meals
        {meals.map((meal, ind) => (
          <div key={ind}>
            <input
              type="checkbox"
              name={`meal-${ind}`}
              value={meal}
              checked={formData.checkedMeals[ind]}
              onChange={handleChange}
            />
            {meal}
          </div>
        ))}
      </label>

      <label className="selectStyles">
        Your Holiday Choice
        <select
          name="holidays"
          value={formData.holidays}
          onChange={handleChange}
        >
          {holidayChoices.map((opt, ind) => (
            <option key={ind} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      <button className="button" type="submit">
        Submit
      </button>
      <button
        className="button"
        type="reset"
        onClick={handleReset}
      >
        Clear Form
      </button>

      {data && (
        <div className="data">
          <h2 className="dataTitle">
            Your Submitted Data:
          </h2>
          <p>First Name: {data.firstName.toUpperCase()}</p>
          <p>Last Name: {data.lastName.toUpperCase()}</p>
          <p>Phone Number: {data.tel}</p>
          <p>Gender: {data.gender}</p>
          <p>
            Favorite Meals: {data.checkedMeals.join(", ")}
          </p>
          <p>Holiday Choice: {data.holidays}</p>
          {photoPreview && (
            <div>
              <span>Photo: </span>
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="photoPreview"
              />
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;

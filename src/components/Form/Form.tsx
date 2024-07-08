import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  tel: string;
  gender: string;
  checkedMeals: string[];
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("male");
  const [checkedMeals, setCheckedMeals] = useState(
    new Array(meals.length).fill(false),
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [holidays, setHolidays] = useState(
    holidayChoices[0],
  );
  const [data, setData] = useState<FormData | null>(null);

  const submitHandler = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData: FormData = {
      firstName,
      lastName,
      tel,
      gender,
      checkedMeals: meals.filter((_, i) => checkedMeals[i]),
      photo,
      holidays,
    };

    localStorage.setItem("form", JSON.stringify(formData));

    setData(formData);

    setFirstName("");
    setLastName("");
    setTel("");
    setGender("male");
    setCheckedMeals(new Array(meals.length).fill(false));
    setPhoto(null);
    setHolidays(holidayChoices[0]);
  };

  const handleMealChange = (index: number) => {
    const updatedCheckedMeals = checkedMeals.map(
      (meal, i) => (i === index ? !meal : meal),
    );
    setCheckedMeals(updatedCheckedMeals);
  };

  const handleHolidayChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setHolidays(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} action="#" method="get">
      <label>
        First Name*{" "}
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Enter First Name"
          required
        />
      </label>

      <label>
        Last Name*{" "}
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Enter Last Name"
          required
        />
      </label>

      <label>
        Phone Number*{" "}
        <input
          type="tel"
          name="tel"
          id="tel"
          value={tel}
          onChange={e => setTel(e.target.value)}
          placeholder="Enter Your Phone Number"
          required
        />
      </label>

      <label>
        Gender
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          checked={gender === "male"}
          onChange={e => setGender(e.target.value)}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          checked={gender === "female"}
          onChange={e => setGender(e.target.value)}
        />{" "}
        Female
      </label>

      <label>
        Upload Your Photo
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={e =>
            setPhoto(
              e.target.files ? e.target.files[0] : null,
            )
          }
          placeholder="Upload File"
        />
      </label>

      <label>
        Favourite Meals
        {meals.map((meal, ind) => (
          <div key={ind}>
            <input
              type="checkbox"
              name="meals"
              id={`${meal}-${ind}`}
              value={meal}
              checked={checkedMeals[ind]}
              onChange={() => handleMealChange(ind)}
            />
            {meal}
          </div>
        ))}
      </label>

      <label>
        Your Holiday Choice
        <select
          value={holidays}
          onChange={handleHolidayChange}
        >
          {holidayChoices.map((opt, ind) => (
            <option key={ind} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
      {data && (
        <div>
          <h2>Your Submitted Data:</h2>
          <p>First Name: {data.firstName}</p>
          <p>Last Name: {data.lastName}</p>
          <p>Phone Number: {data.tel}</p>
          <p>Gender: {data.gender}</p>
          <p>
            Favourite Meals: {data.checkedMeals.join(", ")}
          </p>
          <p>Holiday Choice: {data.holidays}</p>
          <p>
            Photo:{" "}
            {data.photo
              ? data.photo.name
              : "No photo uploaded"}
          </p>
        </div>
      )}
    </form>
  );
};

export default Form;
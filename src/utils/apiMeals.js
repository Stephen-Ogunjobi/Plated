const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export async function getMealsCategory() {
  const res = await fetch(`${API_URL}categories.php`);

  if (!res.ok) throw Error("Failed to fetch meals category");

  const data = await res.json();

  return data;
}

import supabase from "../supabase";

export async function getProductsCategory() {
  const { data, error } = await supabase.from("products").select("*").limit(8);

  if (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
  return data;
}

export async function getProduct(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Slug not found");
  }

  return data;
}

export async function getRelatedProducts(category, excludeId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(3);

  if (error) {
    console.error(error);
    throw new Error("Related products could not be loaded");
  }

  return data;
}

export const fetchProductsBySearch = async (search) => {
  let query = supabase.from("products").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Related products could not be loaded");
  }

  return data;
};

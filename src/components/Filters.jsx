import axios from "axios";
import React, { useEffect } from "react";

const Filters = (props) => {
  const { filterProducts = () => {} } = props;
  const [search, setSearch] = React.useState("");

  const [priceFilter, setPriceRange] = React.useState({});

  const [categoryFilter, setCategoryFilter] = React.useState("");

  const [categories, setCategories] = React.useState(["ALL"]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get("https://api.escuelajs.co/api/v1/categories")
        .then((response) => {
          setCategories([
            { categorySlug: "ALL", id: "all_id", value: "ALL", name: "ALL" },
            ...response.data,
          ]);
        });
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filterData = async () => {
      let searchParams = "?";

      if (search) {
        searchParams += `title=${search}&`;
      }

      if (priceFilter) {
        if (priceFilter?.min !== undefined)
          searchParams += `price_min=${priceFilter?.min}&`;

        if (priceFilter?.max !== undefined)
          searchParams += `price_max=${priceFilter?.max}&`;
      }

      if (categoryFilter && categoryFilter !== "ALL") {
        searchParams += `categorySlug=${categoryFilter}&`;
      }

      searchParams = searchParams.substring(0, searchParams.length - 1);

      let st =
        `https://api.escuelajs.co/api/v1/products` +
        (searchParams ? searchParams : "");
      await axios.get(st).then((response) => {
        console.log(response, "filters");
        filterProducts(response.data);
      });
    };

    filterData();
  }, [search, priceFilter, categoryFilter]);

  return (
    <div className="flex flex-col  w-full gap-6">
      <div className="filter-by-search">
        <h2 className="text-lg font-semibold text-gray-800">Search</h2>
        <input
          name="search"
          className="input-box w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="'filter-by-price">
        <h3 className="text-lg font-semibold text-gray-800">Filter by price</h3>
        <label>min</label>
        <input
          name="min-price"
          value={priceFilter.min}
          className="input-box w-[20%] mx-4"
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <label>max</label>
        <input
          name="min-price"
          value={priceFilter.max}
          className="input-box w-[20%] mx-4"
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, max: e.target.value }))
          }
        />
      </div>

      <div className="filter-by-category">
        <div className="text-lg font-semibold text-gray-800">
          Filter by category
        </div>
        <select
          name="category"
          className="input-box w-full"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories?.map((category) => {
            return (
              <option
                key={category.id}
                name={category.name}
                value={category.slug}
              >
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Filters;

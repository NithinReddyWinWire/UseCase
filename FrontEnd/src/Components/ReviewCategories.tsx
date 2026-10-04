import { useState } from "react";

type Category = {
  categoryId: number;
  categoryName: string;
  requiresProject: boolean;
};

type CategorySelectProps = {
  onCategorySelect: (category: Category | null) => void;
};

const categories: Category[] = [
  {
    categoryId: 1,
    categoryName: "Project",
    requiresProject: true,
  },
  {
    categoryId: 2,
    categoryName: "Yearly",
    requiresProject: false,
  },
  {
    categoryId: 3,
    categoryName: "Exit",
    requiresProject: false,
  },
  {
    categoryId: 4,
    categoryName: "Entry",
    requiresProject: false,
  },
  {
    categoryId: 5,
    categoryName: "Quarterly",
    requiresProject: false,
  },
];

function ReviewCategories({
  onCategorySelect,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  function handleCategoryChange(value: string) {
    setSelectedCategoryId(value);

    if (!value) {
      onCategorySelect(null);
      return;
    }

    const category = categories.find(
      (category) => category.categoryId === Number(value)
    );

    if (category) {
      onCategorySelect(category);
    }
  }

  const selectedCategory = categories.find(
    (category) =>
      category.categoryId === Number(selectedCategoryId)
  );

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="category"
        className="m-2.5 block text-m font-medium text-black"
      >
        Category
      </label>

      <div className="relative w-[25vw] p-1 ">
        {/* Selected category button */}
        <button
          id="category"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-full
            rounded-lg
            border
            border-[#E2E0D8]
            bg-white
            px-4
            py-3
            text-left
            font-['DM_Sans']
            text-sm
            text-[#242424]
            outline-none
            transition
            hover:border-[#D0CEC5]
            focus:border-[#4061f1]
            focus:ring-4
          focus:ring-[#cff4ff]/60
          "
        >
          {selectedCategory
            ? selectedCategory.categoryName
            : "Select category"}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <ul
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-2
              max-h-60
              overflow-y-auto
              rounded-lg
              border
              border-[#E2E0D8]
              bg-white
              shadow-lg
            "
          >
            {categories.map((category) => (
              <li
                key={category.categoryId}
                className="
                  border-b
                  border-[#E2E0D8]
                  last:border-b-0
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryChange(
                      String(category.categoryId)
                    );
                    setIsOpen(false);
                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    font-['DM_Sans']
                    text-sm
                    text-[#242424]
                    transition
                    hover:bg-[#cff4ff]
                  "
                >
                  {category.categoryName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReviewCategories;



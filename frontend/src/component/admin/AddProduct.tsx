import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../components/dialog";
import { useState } from "react";
import { plus } from "../../assets";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { useCreateProductMutation } from "../../redux/features/product/productApi";

const tagOptionsMap: { [key: string]: string[] } = {
  Frame: ["Acrylic", "Frameless", "Frame", "Wood"],
  Painting: ["Oil", "Watercolor", "Acrylic", "Digital"],
  "Home Decor": ["Wall Art", "Vases", "Candles", "Mirrors"],
  Furniture: ["Chairs", "Tables", "Sofas", "Shelves"],
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    sizeLabel: "",
    features: "",
    images: [] as File[],
    rating: 0,
    productType: "",
    productTag: "",
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      if (id === "productType") {
        return {
          ...prev,
          productType: value,
          productTag: "",
        };
      }
      return {
        ...prev,
        [id]: id === "rating" ? Number(value) : value,
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("price", formData.price);
      payload.append("size", JSON.stringify({ label: formData.sizeLabel }));
      payload.append(
        "features",
        JSON.stringify(
          formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        )
      );
      payload.append("rating", String(formData.rating));
      payload.append("productType", formData.productType);
      payload.append("productTag", formData.productTag);
      formData.images.forEach((file) => payload.append("image", file));

      const result = await createProduct(payload).unwrap();
      console.log("Product created:", result);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Failed to create product.");
    }
  };

  const availableTags = tagOptionsMap[formData.productType] || [];

  return (
    <Dialog>
      <DialogTrigger className="flex items-center bg-[#1B43C6] py-3 px-7 gap-5 rounded-md">
        <img src={plus} className="w-6 h-6" alt="Add product" />
        <p className="text-xs font-semibold text-white">Add Product</p>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Add Product
          </DialogTitle>
          <DialogDescription className="text-center">
            Please fill in all fields.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 my-2">
          {[
            { id: "title", label: "Product Title" },
            { id: "price", label: "Price", type: "text" },
            { id: "sizeLabel", label: "Size Label" },
            { id: "features", label: "Features (comma-separated)" },
            { id: "rating", label: "Rating (0-5)", type: "number" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id} className="grid w-full items-center gap-1.5">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                value={(formData as any)[id]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="productType">Product Type</Label>
            <select
              id="productType"
              className="border p-2 rounded-md"
              value={formData.productType}
              onChange={handleChange}
              required
            >
              <option value="">Select product type</option>
              <option value="Frame">Frame</option>
              <option value="Painting">Painting</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          {formData.productType && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="productTag">Product Tag</Label>
              <select
                id="productTag"
                className="border p-2 rounded-md"
                value={formData.productTag}
                onChange={handleChange}
                required
              >
                <option value="">Select product tag</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="images">Upload Images (Multiple)</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              required
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="border-secondary text-secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-secondary hover:bg-blue-600 text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;

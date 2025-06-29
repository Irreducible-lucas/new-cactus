import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";

interface Product {
  _id: string;
  title: string;
  price: string;
  oldPrice?: string;
  size: { label: string };
  productType: string;
  productTag: string;
  features: string[];
  rating: number;
  image: string[];
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProductModal = ({
  isOpen,
  onClose,
  product,
}: EditProductModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    oldPrice: "",
    size: { label: "" },
    productType: "",
    productTag: "",
    features: "",
    rating: 0,
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice || "",
        size: { label: product.size?.label || "" },
        productType: product.productType,
        productTag: product.productTag,
        features: product.features?.join(", ") || "",
        rating: product.rating,
      });
      setPreviewUrls(product.image || []);
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "size") {
      setFormData((prev) => ({ ...prev, size: { label: value } }));
    } else if (name === "rating") {
      setFormData((prev) => ({ ...prev, rating: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files) as File[];
    setNewImages(fileArray);

    const previews = fileArray.map((file: File) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async () => {
    if (!product) return;

    try {
      const body = new FormData();
      body.append("title", formData.title);
      body.append("price", formData.price);
      body.append("oldPrice", formData.oldPrice || "");
      body.append("rating", String(formData.rating));
      body.append("productType", formData.productType);
      body.append("productTag", formData.productTag);
      body.append("size", JSON.stringify({ label: formData.size.label }));
      body.append("features", formData.features);

      newImages.forEach((file) => {
        body.append("image", file);
      });

      await updateProduct({ id: product._id, updateData: body }).unwrap();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Title"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Price"
          />
          <input
            name="oldPrice"
            type="number"
            value={formData.oldPrice}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Old Price"
          />
          <input
            name="size"
            value={formData.size.label}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Size Label (e.g. S, M, L)"
          />
          <input
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Product Type"
          />
          <input
            name="productTag"
            value={formData.productTag}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Product Tag"
          />
          <input
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Rating (0-5)"
            min={0}
            max={5}
          />
          <input
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Features (comma-separated)"
          />

          <div>
            <label className="block mb-1">Upload New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded w-full"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {previewUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="preview"
                  className="h-16 w-16 rounded object-cover border"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;

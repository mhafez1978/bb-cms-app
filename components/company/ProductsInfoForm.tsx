"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProductsInfoForm = ({
  hideForm,
  setHideForm,
  onProductCreated,
}: {
  hideForm: boolean;
  setHideForm: React.Dispatch<React.SetStateAction<boolean>>;
  onProductCreated?: () => void;
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [resultError, setResultError] = useState("");
  const [resultSuccess, setResultSuccess] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const createProductsService = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultError("");
    setResultSuccess("");

    if (!session?.user?.id) {
      setResultError("You need to login.");
      return;
    }

    try {
      setLoading(true);

      const createdById = session?.user?.id;

      const payload = {
        name: name,
        description: description,
        quantity: quantity,
        cost: cost,
        price: price,
        notes: notes,
        createdById: createdById,
      };

      if (
        !name.trim() ||
        !description.trim() ||
        quantity < 0 ||
        cost < 0 ||
        price < 0
      ) {
        setResultError("Please fill all fields with valid data.");
        return;
      }

      const res = await fetch(`/api/company/find/user/company`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("faied");
        setResultError("failed");
        return;
      }

      setResultSuccess("Product created successfully!");
      setName("");
      setDescription("");
      setQuantity(0);
      setCost(0);
      setPrice(0);
      setNotes("");
      if (onProductCreated) onProductCreated();
      setResultSuccess("");

      return res;
    } catch (err) {
      console.error(err);
      setResultError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <div className={hideForm ? "hidden" : "flex flex-col gap-4"}>
        <h2 className="text-lg font-semibold">Create Product</h2>
        <form onSubmit={createProductsService} className="flex flex-col gap-4">
          <Input
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            min={0}
          />
          <Input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            required
            min={0}
            step="0.01"
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min={0}
            step="0.01"
          />
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            className="py-4 px-8 bg-emerald-500 text-black"
          >
            {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>

        {resultError && <p className="text-red-500">{resultError}</p>}
        {resultSuccess && <p className="text-emerald-500">{resultSuccess}</p>}
      </div>
    </div>
  );
};

export default ProductsInfoForm;

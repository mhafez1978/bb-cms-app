"use client";

import { useEffect, useState } from "react";

export default function ModelsPage() {
  const [tables, setTables] = useState<string[]>([]);
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "" }]);
  const [syncing, setSyncing] = useState(false);

  const [relationMode, setRelationMode] = useState(false);
  const [relationType, setRelationType] = useState("one-to-many");
  const [relatedModel, setRelatedModel] = useState("");
  const [customFkName, setCustomFkName] = useState("");

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.tables && typeof data.tables === "object") {
          const tableNames = Object.keys(data.tables).filter(Boolean);
          //console.log("Table names:", tableNames);
          setTables(tableNames);
        } else {
          console.warn("Invalid tables structure", data.tables);
          setTables([]);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idField = {
      name: "id",
      type: "Int @id @default(autoincrement())",
    };

    const finalFields = [idField, ...fields];

    if (relationMode && relatedModel) {
      const fkName = customFkName || `${relatedModel.toLowerCase()}Id`;
      const relationField = relatedModel;

      if (relationType === "one-to-one") {
        finalFields.push(
          { name: fkName, type: "Int" },
          {
            name: relationField,
            type: `${relatedModel} @relation(fields: [${fkName}], references: [id])`,
          }
        );
      }

      if (relationType === "one-to-many") {
        finalFields.push({
          name: relationField.toLowerCase() + "s",
          type: `${relatedModel}[]`,
        });
      }

      if (relationType === "many-to-many") {
        finalFields.push({
          name: relationField.toLowerCase() + "s",
          type: `${relatedModel}[]`,
        });
      }
    }

    const payload = {
      modelName,
      fields: finalFields,
    };

    const res = await fetch("/api/models", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || "Model definition created.");
  };

  const handleSync = async () => {
    setSyncing(true);
    const res = await fetch("/api/models/sync", {
      method: "POST",
    });
    const data = await res.json();
    alert(data.message || "Database synchronized.");
    setSyncing(false);
  };

  return (
    <div className="min-h-[40vh] p-6 space-y-4">
      <h1 className="text-xl font-bold">Prisma Models (Tables)</h1>
      <ul className="list-disc pl-5 text-black">
        <ul className="list-disc pl-5 text-black bg-yellow-100 border border-red-500">
          {/* <pre className="bg-gray-100 text-xs p-2 mt-2">
            {JSON.stringify(tables, null, 2)}
          </pre> */}

          <ul className="list-disc pl-5 text-black">
            {tables.map((table) => (
              <li key={table} className="text-blue-800">
                {table}
              </li>
            ))}
          </ul>
        </ul>
      </ul>
      <hr />
      <h2 className="text-lg font-semibold">Create New Model Definition</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Model Name */}
        <div>
          <label className="block font-semibold mb-1">Model Name</label>
          <input
            type="text"
            placeholder="e.g., Product"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Fields */}
        <div className="space-y-2">
          <label className="block font-semibold">Fields</label>
          {fields.map((field, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                placeholder="Field name"
                value={field.name}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[idx].name = e.target.value;
                  setFields(newFields);
                }}
                className="border p-2 flex-1"
              />
              <input
                type="text"
                placeholder="Type (e.g., String, Int)"
                value={field.type}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[idx].type = e.target.value;
                  setFields(newFields);
                }}
                className="border p-2 flex-1"
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => setFields([...fields, { name: "", type: "" }])}
          >
            + Add Field
          </button>
        </div>

        {/* Relationships */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={relationMode}
              onChange={(e) => setRelationMode(e.target.checked)}
            />
            Define a relationship
          </label>

          {relationMode && (
            <div className="space-y-3 border p-4 bg-gray-50 rounded">
              <div>
                <label className="block font-semibold">Relation Type</label>
                <select
                  value={relationType}
                  onChange={(e) => {
                    setRelationType(e.target.value);
                    setCustomFkName("");
                  }}
                  className="border p-2 w-full"
                >
                  <option value="one-to-one">One-to-One</option>
                  <option value="one-to-many">One-to-Many</option>
                  <option value="many-to-many">Many-to-Many</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold">Related Model</label>
                <select
                  value={relatedModel}
                  onChange={(e) => setRelatedModel(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select model</option>
                  {tables.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {(relationType === "one-to-one" ||
                relationType === "one-to-many") && (
                <div>
                  <label className="block font-semibold">
                    Foreign Key Field Name
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g., ${
                      relatedModel?.toLowerCase() || "user"
                    }Id`}
                    value={customFkName}
                    onChange={(e) => setCustomFkName(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Model Definition
        </button>
      </form>

      <hr />

      <button
        onClick={handleSync}
        disabled={syncing}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {syncing ? "Syncing..." : "Sync Changes"}
      </button>
    </div>
  );
}

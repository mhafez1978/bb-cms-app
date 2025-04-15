"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { User_country, User_state } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

const CompanyInfoForm = ({
  hideForm,
  setHideForm,
}: {
  hideForm?: boolean;
  setHideForm?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [poc, setPoc] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [websiteTouched, setWebsiteTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [pocTouched, seetPocTouched] = useState(false);
  const [addressLine1Touched, setAddressLine1Touched] = useState(false);
  const [addressLine2Touched, setAddressLine2Touched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [zipcodeTouched, setZipcodeTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultError, setResultError] = useState("");
  const [resultSuccess, setResultSuccess] = useState("");

  const nameError =
    nameTouched && name.trim() === "" ? "Company name is required." : "";
  const descriptionError =
    descriptionTouched && description.trim() === ""
      ? "Description is required."
      : "";
  const phoneError =
    phoneTouched && phone.trim() === "" ? "Phone is required." : "";
  const websiteError =
    websiteTouched && website.trim() === "" ? "Website is required." : "";
  const emailError =
    emailTouched && email.trim() === "" ? "Email is required." : "";

  const pocError =
    pocTouched && poc.trim() === "" ? "Point of contact is required." : "";

  const addressLine1Error =
    addressLine1Touched && addressLine1.trim() === ""
      ? "Address Line 1 is required."
      : "";

  const addressLine2Error =
    addressLine2Touched && addressLine2.trim() === ""
      ? "Address Line 2 is required."
      : ""; // Optional field? You might skip this if not required

  const cityError =
    cityTouched && city.trim() === "" ? "City is required." : "";

  const stateError =
    stateTouched && state.trim() === "" ? "State is required." : "";

  const zipcodeError =
    zipcodeTouched && zipcode.trim() === "" ? "Zip code is required." : "";

  const countryError =
    countryTouched && country.trim() === "" ? "Country is required." : "";

  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);
  const [show9, setShow9] = useState(false);
  const [show10, setShow10] = useState(false);
  const [show11, setShow11] = useState(false);
  const [show12, setShow12] = useState(false);

  const createCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      console.error("You need to login.");
      return;
    }

    const userId = session.user.id;

    const payload = {
      name,
      description,
      phone,
      website,
      email,
      poc,
      addressLine1,
      addressLine2,
      city,
      state,
      zipcode,
      country,
    };

    try {
      const response = await fetch(`/api/company/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setResultError("Error creating company");
        setLoading(false);
        return result;
      }
      setResultSuccess("Company information saved ...");
      setLoading(false);
      setResultError("");
      setHideForm(true);
      return result;
    } catch (error) {
      console.error("Request failed:", error);
      return { error: "Something went wrong while creating the company." };
    }
  };

  return (
    <div className="py-10">
      <div className={hideForm ? "hidden" : "flex flex-col gap-4"}>
        <h2 className="text-lg font-semibold">
          Legal Business Public Profile Info
        </h2>
        <form className="flex flex-col gap-4" onSubmit={createCompany}>
          {/* Company Name */}
          <div className="flex flex-row gap-4 items-center">
            <Input
              className="w-2/3"
              placeholder="Enter Company Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShow2(true);
              }}
              onBlur={() => setNameTouched(true)}
            />
            {nameError && (
              <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                {nameError}
              </p>
            )}
          </div>

          {/* Company Description */}
          {show2 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Enter Company Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setShow3(true);
                }}
                onBlur={() => setDescriptionTouched(true)}
              />
              {descriptionError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {descriptionError}
                </p>
              )}
            </div>
          )}

          {/* Remaining fields */}
          {show3 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Telephone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setShow4(true);
                }}
                onBlur={() => setPhoneTouched(true)}
              />
              {phoneError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {phoneError}
                </p>
              )}
            </div>
          )}
          {show4 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Enter Company Website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  setShow5(true);
                }}
                onBlur={() => setWebsiteTouched(true)}
              />
              {websiteError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {websiteError}
                </p>
              )}
            </div>
          )}
          {show5 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Enter Company Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShow6(true);
                }}
                onBlur={() => setEmailTouched(true)}
              />
              {emailError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {emailError}
                </p>
              )}
            </div>
          )}
          {show6 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Named Point of Contact"
                value={poc}
                onChange={(e) => {
                  setPoc(e.target.value);
                  setShow7(true);
                }}
                onBlur={() => seetPocTouched(true)}
              />
              {pocError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {pocError}
                </p>
              )}
            </div>
          )}
          {show7 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Address Line 1"
                value={addressLine1}
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                  setShow8(true);
                }}
                onBlur={() => setAddressLine1Touched(true)}
              />
              {addressLine1Error && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {addressLine1Error}
                </p>
              )}
            </div>
          )}
          {show8 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Address Line 2"
                value={addressLine2}
                onChange={(e) => {
                  setAddressLine2(e.target.value);
                  setShow9(true);
                }}
                // onBlur={() => setAddressLine2Touched(true)}
              />
              {addressLine2Error && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {addressLine2Error}
                </p>
              )}
            </div>
          )}
          {show9 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setShow10(true);
                }}
                onBlur={() => setCityTouched(true)}
              />
              {cityError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {cityError}
                </p>
              )}
            </div>
          )}
          {show10 && (
            <div className="flex flex-row gap-4 items-center">
              <div className="w-2/3">
                <Select
                  onValueChange={(value) => {
                    setState(value);
                    setShow11(true);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Choose State"
                      onBlur={() => setStateTouched(true)}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(User_state).map((state) => (
                      <SelectItem key={state} value={state}>
                        <span className="capitalize"> {state}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {stateError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {stateError}
                </p>
              )}
            </div>
          )}
          {show11 && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-2/3"
                placeholder="Zip Code"
                value={zipcode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                  setShow12(true);
                }}
                onBlur={() => setZipcodeTouched(true)}
              />
              {zipcodeError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {zipcodeError}
                </p>
              )}
            </div>
          )}
          {show12 && (
            <div className="flex flex-row gap-4 items-center">
              <div className="w-2/3">
                <Select onValueChange={(value) => setCountry(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Choose Country"
                      onBlur={() => setCountryTouched(true)}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(User_country).map((country) => (
                      <SelectItem key={country} value={country}>
                        <span className="capitalize">{country}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {countryError && (
                <p className="w-1/3 text-sm font-semibold text-white bg-red-500 py-2 px-2 rounded">
                  {countryError}
                </p>
              )}
            </div>
          )}

          {show12 && (
            <div className="mt-6">
              {loading ? (
                <Button type="submit" className="bg-black text-white py-2 px-8">
                  Saving to database ...
                </Button>
              ) : (
                <Button
                  onClick={(e) => setLoading(true)}
                  type="submit"
                  className="bg-black text-white py-2 px-8"
                >
                  Save
                </Button>
              )}
            </div>
          )}
        </form>
        {resultError && <p className="text-red-500">{resultError}</p>}
        {resultSuccess && <p className="text-emerald-500">{resultSuccess}</p>}
      </div>
    </div>
  );
};

export default CompanyInfoForm;

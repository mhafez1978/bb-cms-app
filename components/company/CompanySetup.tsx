"use client";
import { useEffect, useState } from "react";
import CompanyInfoForm from "@/components/company/CompanyInfoForm";
import ProductInfoForm from "@/components/company/ProductsInfoForm";
import { Button } from "../ui/button";

export default function CompanyForm() {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [activeStep, setActiveStep] = useState(false);
  const [step2Started, setStep2Started] = useState(false);
  const [productCount, setProductCount] = useState(0); // to track multiple entries

  useEffect(() => {
    if (step1Done === true) {
      setActiveStep(true);
    } else {
      setActiveStep(false);
    }

    if (step2Done === true) {
      setActiveStep(true);
    } else {
      setActiveStep(false);
    }
  }, [step2Done, step1Done, activeStep]);

  return (
    <div className="min-h-[72vh] py-10 px-10">
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex flex-row items-center gap-4">
          <p className="text-xl font-black">Step 1: </p>
          <p className={step1Done ? "line-through" : "text-base"}>
            Start by updating your company profile info.
          </p>
        </div>
      </div>

      <CompanyInfoForm hideForm={step1Done} setHideForm={setStep1Done} />
      {step1Done && (
        <>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-xl font-black">Step 2: </p>
            <p className={step2Done ? "line-through" : "text-base"}>
              Then, we'll add your products.
            </p>
          </div>
          {step2Done === true ? (
            <>
              <ProductInfoForm
                hideForm={true}
                setHideForm={() => {}} // optional no-op
                onProductCreated={() => {
                  setStep2Started(true);
                  setProductCount((prev) => prev + 1);
                }}
              />
              {productCount > 0 && !step2Done && (
                <Button
                  onClick={() => setStep2Done(true)}
                  className="mt-4 w-fit bg-black text-white"
                >
                  I'm done adding products
                </Button>
              )}
            </>
          ) : (
            <>
              <ProductInfoForm
                hideForm={false}
                setHideForm={() => {}} // optional no-op
                onProductCreated={() => {
                  setStep2Started(true);
                  setProductCount((prev) => prev + 1);
                }}
              />
              {productCount > 0 && !step2Done && (
                <Button
                  onClick={() => setStep2Done(true)}
                  className="mt-4 w-fit bg-black text-white"
                >
                  I'm done adding products
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

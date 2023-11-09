import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

type Props = {};

const PaymentStep = (props: Props) => {
  const pay = async () => {
    await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1OAGJgLlIjOxm5nrXKOa6SHX",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.assign(res);
      });
  };

  return (
    <div>
      <section className="flex items-center justify-center py-2 bg-gray">
        <div className="container mx-auto">
          <div className="mx-auto max-w-[600px] rounded-[10px] bg-white p-10 text-center shadow-card md:py-[55px] md:px-[70px]">
            <div className="mx-auto text-center mb-14">
              <img src="/payment.svg" alt="Payment image" className="w-full max-w-full mx-auto" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-black sm:text-3xl">Payment</h2>
            <p className="mb-5 text-base text-body-color">
              Please pay the inspection fee of $699 to continue. Once payment is complete, we will schedule your
              inspection.
            </p>
            <Button onClick={pay} variant="transparent">
              Pay $699
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentStep;

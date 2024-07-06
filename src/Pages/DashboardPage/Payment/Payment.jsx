import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div className="bg-sky-400 h-[500px] lg:h-[700px]">
            <h1 className="text-4xl font-bold text-center text-white  py-10  mb-20">-----Payment Now-----</h1>

            <div className="  ">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
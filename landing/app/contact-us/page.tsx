import { Button, TextInput, Textarea } from "@mantine/core";
import { IconClock, IconMapPin, IconPhoneCall } from "@tabler/icons-react";

type Props = {};

const ContactUs = (props: Props) => {
  return (
    <section className="bg-white" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <p className="text-base font-semibold uppercase tracking-wide text-blue-600 ">Contact</p>
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900  text-3xl sm:text-5xl">
              Get in Touch
            </h2>
            {/* <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 ">In hac habitasse platea dictumst</p> */}
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-600 ">
                ClassName aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec
                ipsum orci. Ut scelerisque sagittis ante, ac tincidunt sem venenatis ut.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-700 text-gray-50">
                    <IconMapPin color="white" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">Our Address</h3>
                    <p className="text-gray-600 ">1230 Maecenas Street Donec Road</p>
                    <p className="text-gray-600 ">New York, EEUU</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-700 text-gray-50">
                    <IconPhoneCall />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">Contact</h3>
                    <p className="text-gray-600 ">Mobile: +1 (123) 456-7890</p>
                    <p className="text-gray-600 ">Mail: tailnext@gmail.com</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-700 text-gray-50">
                    <IconClock />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">Working hours</h3>
                    <p className="text-gray-600 ">Monday - Friday: 08:00 - 17:00</p>
                    <p className="text-gray-600 ">Saturday &amp; Sunday: 08:00 - 12:00</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
              <form id="contactForm">
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <TextInput placeholder="Your Name" />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <TextInput placeholder="Your Email" type="email" />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <Textarea placeholder="Your Message" rows={5} cols={30} />
                  </div>
                </div>
                <div className="text-center">
                  <Button type="submit" fullWidth size="md">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

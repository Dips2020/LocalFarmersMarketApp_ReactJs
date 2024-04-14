/* eslint-disable no-unused-vars */
import React from "react";
import TextField from "../../FormValidation/userSignUp/TextField";
import { Formik } from "formik";

const Contact = () => {
  return (
    <Formik initialValues={{ email: "", password: "" }}>
      <div className="bg-white w-[1200px] h-auto mt-[92px] flex flex-col justify-center items-center rounded-t-lg">
        <span className="h-[60px] w-full text-2xl font-bold flex justify-center items-center">
          Feel free to Contact Us
        </span>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.168154184679!2d85.32819117550964!3d27.712093976179872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196de5da5741%3A0x652792640c70ede9!2sHerald%20College%20Kathmandu!5e0!3m2!1sen!2snp!4v1711597302730!5m2!1sen!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div className="flex flex-col w-full justify-center items-center h-auto">
          <div className="w-full flex flex-col justify-center items-center h-auto">
            <form
              action="https://formspree.io/f/mgegnobg"
              method="post"
              className="w-full flex flex-col justify-center items-center mb-4 h-auto"
            >
              <span className="h-[60px] w-[90%] text-2xl font-bold flex justify-center items-center">
                GET IN TOUCH
              </span>
              <div className="h-[400px] w-[90%] flex justify-center items-center bg-white rounded-lg">
                <div className="w-[25%] h-[300px] flex flex-col justify-center items-center">
                  <div>
                    <TextField name="firstName" label="First Name" required />
                  </div>
                  <div>
                    <TextField name="lastName" label="Last Name" required />
                  </div>
                  <div>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      required
                    />
                  </div>
                </div>
                <div className="w-[50%] h-[300px] flex flex-col justify-center items-center">
                  <textarea
                    name="Message"
                    cols="60"
                    rows="9"
                    placeholder="Send a Message ..."
                    autoComplete="off"
                    required
                    className="border-[2px] p-2 border-gray-400 hover:border-blue-700 outline-none rounded-lg"
                  ></textarea>
                </div>
                <div className="w-[25%] h-[300px] flex justify-center items-center mr-[4px]">
                  <input
                    type="submit"
                    value="Send Message"
                    className="bg-[#069E2D] mt-2 hover:bg-[#04773B] text-[18px] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px] cursor-pointer"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Contact;

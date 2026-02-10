"use client";
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { notify } from '@/utils/toast';
import { usePathname } from 'next/navigation';
import { constant } from '@/utils/constant';
import axios from 'axios';

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            address: '',
            message: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${constant.SERVER_URL}public/contact`, data, { withCredentials: true });
            if (res.data.success) {
                notify.success(res.data.message);
                reset();
            }
        } catch (err) {
            notify.error(err.message)
            console.log(error)
        }
    };

    let path = usePathname();

    let isHome = path.startsWith('/author') || path.startsWith('/publisher') || path.startsWith('/reviewer') ? false : true

    let textColor = isHome ? "text-primary border-primary" : "text-secondary border-secondary";

    return (
        <div className="max-w-5xl mx-auto py-8">
            {/* Header */}
            <h1 className={`text-2xl md:text-3xl font-bold mb-8 border-b-2  pb-2 inline-block ${textColor}`}>
                Contact Us
            </h1>

            {/* Editor-in-Chief Box */}
            <div className="bg-primary-foreground rounded-lg shadow-sm border-2 border-border p-4 md:p-8 mb-10 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${isHome ? "bg-primary" : "bg-secondary"}`}></div>
                <h2 className="text-xl md:text-2xl font-bold text-danger mb-3 md:mb-6 uppercase tracking-wide">Editor-in-Chief</h2>

                <div className="text-sm md:text-base space-y-2 text-text-primary/70 font-medium">
                    <p className="text-base md:text-lg text-text-primary font-bold">A 86, Swastik Row House, Near Shreeji Nagri,</p>
                    <p>Palanpur Jakatnaka,</p>
                    <p>Surat-395005, Gujarat, India</p>

                    <div className="flex items-center justify-center gap-2 mt-4 text-black">
                        <Phone className="w-4 h-4" />
                        <span>Mobile: 9909091133</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-black">
                        <Mail className="w-4 h-4" />
                        <span>E-mail: bhumika.charnanand@vwvususrat.ac.in</span>
                    </div>
                </div>
            </div>

            {/* Info Text */}
            <div className="bg-border/50 border-l-4 border-primary-blue p-4 mb-8 rounded-r-lg">
                <div className="flex flex-col gap-2 text-sm text-text-primary/70">
                    <p>• Before contacting us, please read our FAQs.</p>
                    <p>• Editorial Board queries: <span className="font-semibold text-text-primary">support@ijarmy.com</span></p>
                    <p>• For any specific query you may send us an email or use the contact form below.</p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-primary-foreground rounded-lg md:rounded-xl shadow-md md:shadow-lg border border-gray-100 p-4 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary-blue" />
                    Send us a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-text-primary/70 mb-1">
                                <span className="text-danger mr-1">*</span>Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className={`w-full px-4 py-2 border ${errors.name ? 'border-danger' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all`}
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email ID */}
                        <div>
                            <label className="block text-sm font-bold text-text-primary/80 mb-1">
                                <span className="text-danger mr-1">*</span>Email ID
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full px-4 py-2 border ${errors.email ? 'border-danger' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Mobile No. */}
                        <div>
                            <label className="block text-sm font-bold text-text-primary/70 mb-1">
                                <span className="text-danger mr-1">*</span>Mobile No.
                            </label>
                            <input
                                type="tel"
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Must be a valid number"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Must be at least 10 digits"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Must be at most 15 digits"
                                    }
                                })}
                                className={`w-full px-4 py-2 border ${errors.mobile ? 'border-danger' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all`}
                                placeholder="+91 XXXXX XXXXX"
                            />
                            {errors.mobile && <p className="text-danger text-xs mt-1">{errors.mobile.message}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-bold text-text-primary/70 mb-1">
                                <span className="text-danger mr-1">*</span>Address
                            </label>
                            <input
                                type="text"
                                {...register("address", { required: "Address is required" })}
                                className={`w-full px-4 py-2 border ${errors.address ? 'border-danger' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all`}
                                placeholder="City, Country"
                            />
                            {errors.address && <p className="text-danger text-xs mt-1">{errors.address.message}</p>}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-bold text-text-primary/70 mb-1">
                            <span className="text-danger mr-1">*</span>Message
                        </label>
                        <textarea
                            rows="5"
                            {...register("message", { required: "Message is required" })}
                            className={`w-full px-4 py-2 border ${errors.message ? 'border-danger' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all resize-none`}
                            placeholder="Type your message here..."
                        ></textarea>
                        {errors.message && <p className="text-danger text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 w-full flex justify-center lg:justify-start">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${isHome ? "bg-primary/90 hover:bg-primary" : "bg-secondary/90 hover:bg-secondary"}  text-text-secondary px-8 py-3 rounded-lg font-bold  transform active:scale-95 transition-all cursor-pointer duration-200 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            <Send className="w-4 h-4" />
                            {isSubmitting ? 'Sending...' : 'Submit Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

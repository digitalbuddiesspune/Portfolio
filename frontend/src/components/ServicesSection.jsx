import React, { useState } from 'react';
import { Code, Smartphone, ShoppingCart, Users, Globe, Monitor, Layout, FileCode } from 'lucide-react';

const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState(0);

    const services = [
        {
            id: 1,
            title: "Website Development",
            description: [
                "We create responsive, high-performance websites that deliver exceptional user experiences.",
                "Our team uses cutting-edge technologies to build scalable solutions that grow with your business.",
                "From custom designs to content management systems, we tailor every solution to your needs.",
                "We ensure your website is fast, secure, and optimized for search engines.",
                "Our websites are built with modern frameworks and best practices in mind.",
                "We provide ongoing support and maintenance to keep your site running smoothly.",
                "Every project is designed with mobile-first approach for maximum reach.",
                "We transform your ideas into beautiful, functional digital experiences."
            ],
            icon: <Globe className="w-8 h-8" />
        },
        {
            id: 2,
            title: "App Development",
            description: [
                "We develop native and cross-platform mobile applications for iOS and Android.",
                "Our apps are built with user experience and performance as top priorities.",
                "From concept to deployment, we guide you through every step of the process.",
                "We use modern development frameworks to ensure scalability and maintainability.",
                "Our applications are tested thoroughly to ensure bug-free performance.",
                "We provide app store optimization and submission services.",
                "Regular updates and feature enhancements keep your app competitive.",
                "We create apps that engage users and drive business growth."
            ],
            icon: <Smartphone className="w-8 h-8" />
        },
        {
            id: 3,
            title: "CRM Development",
            description: [
                "We build custom Customer Relationship Management systems tailored to your business.",
                "Our CRM solutions help you manage customer interactions and improve relationships.",
                "Track sales, manage leads, and automate workflows with our powerful systems.",
                "We integrate your CRM with existing tools and platforms for seamless operations.",
                "Real-time analytics and reporting help you make data-driven decisions.",
                "Our CRM systems are scalable and adapt as your business grows.",
                "We provide training and support to ensure your team maximizes the system.",
                "Transform your customer management with our innovative CRM solutions."
            ],
            icon: <Users className="w-8 h-8" />
        },
        {
            id: 4,
            title: "E-commerce Development",
            description: [
                "We create powerful e-commerce platforms that drive online sales and growth.",
                "Our online stores feature secure payment gateways and seamless checkout processes.",
                "We integrate inventory management systems to streamline your operations.",
                "Mobile-responsive designs ensure customers can shop from any device.",
                "We optimize your store for search engines to increase visibility and traffic.",
                "Our e-commerce solutions support multiple payment methods and currencies.",
                "We provide analytics and reporting tools to track your business performance.",
                "Transform your business with a professional online store that converts visitors to customers."
            ],
            icon: <ShoppingCart className="w-8 h-8" />
        }
    ];

    const SERVICE_IMAGE = "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771235049/Untitled_900_x_900_px_ghkb7c.png";

    return (
        <div className="relative w-full">
            {/* 1. Top Section - Gradient Background (Yellow, Orange, Red) */}
            <div className="relative bg-gradient-to-br from-[#1B3C53] via-[#3C5B6F] to-[#607274] text-white pt-12 pb-20 px-6 md:px-16 lg:px-24 overflow-hidden">
                {/* Bubble Animations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/20 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${20 + Math.random() * 40}px`,
                                height: `${20 + Math.random() * 40}px`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                            Services We<br />Provide
                        </h2>
                    </div>
                    <div className="pt-0 lg:pl-12">
                        <p className="text-base md:text-lg text-white/95 font-medium leading-relaxed max-w-md drop-shadow-md">
                            We help companies find their way to greatness through innovative technology solutions. Our team performs thorough analysis to select strategic approaches that fit your activities.
                        </p>
                    </div>
                </div>

                {/* Wavy SVG Path at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto block" preserveAspectRatio="none">
                        <path 
                            fill="white" 
                            d="M0,120 C240,80 480,40 720,50 C960,60 1200,100 1440,80 L1440,120 L0,120 Z"
                        />
                    </svg>
                </div>
            </div>

            {/* 2. White Section with Image and Toggle */}
            <div className="relative bg-white py-16 px-6 md:px-16 lg:px-24">
                {/* Fixed Position Icons - 3 Android, 3 Web Dev, 3 CRM */}
                <div className="absolute inset-0 overflow-visible z-0">
                    {/* Fixed positioned icons distributed across the entire screen */}
                    {[
                        // 3 Android icons
                        { icon: 'android', position: { top: '15%', left: '8%' } },
                        { icon: 'android', position: { top: '50%', left: '50%', transform: 'translateX(-50%)' } },
                        { icon: 'android', position: { top: '75%', right: '12%' } },
                        // 3 Web Development icons
                        { icon: 'webdev', position: { top: '25%', right: '15%' } },
                        { icon: 'webdev', position: { top: '60%', left: '20%' } },
                        { icon: 'webdev', position: { top: '85%', left: '50%', transform: 'translateX(-50%)' } },
                        // 3 CRM icons
                        { icon: 'crm', position: { top: '35%', left: '25%' } },
                        { icon: 'crm', position: { top: '65%', right: '25%' } },
                        { icon: 'crm', position: { top: '20%', left: '50%', transform: 'translateX(-50%)' } }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="absolute text-gray-400/15 cursor-pointer group"
                            style={item.position}
                        >
                            {/* Blue line indicator for this icon - appears on hover */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[60px] w-32 h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            
                            {item.icon === 'android' && (
                                <div className="group-hover:animate-[bounce-to-line_0.6s_ease-in-out]">
                                    <svg className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5674.416.416 0 00-.5674.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1349 1.2296L4.8429 5.5773a.4161.4161 0 00-.5674-.1521.416.416 0 00-.1521.5674l1.9973 3.4592C2.6889 11.186.8535 12.8014.8535 15.1384v1.9558c0 2.689 2.1867 4.8858 4.8858 4.8858h12.5172c2.689 0 4.8858-2.1867 4.8858-4.8858v-1.9558c0-2.337-1.8354-3.9524-4.2887-4.817z"/>
                                    </svg>
                                </div>
                            )}
                            {item.icon === 'webdev' && (
                                <div className="group-hover:animate-[bounce-to-line_0.6s_ease-in-out]">
                                    <Globe className="w-14 h-14 md:w-16 md:h-16" />
                                </div>
                            )}
                            {item.icon === 'crm' && (
                                <div className="group-hover:animate-[bounce-to-line_0.6s_ease-in-out]">
                                    <Users className="w-14 h-14 md:w-16 md:h-16" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                    {/* Left: Image - Vertically Centered */}
                    <div className="flex justify-center md:justify-start mt-8 md:mt-0">
                        <div className="relative">
                            <img
                                src={SERVICE_IMAGE}
                                alt="Services"
                                className="w-full max-w-[400px] h-auto"
                            />
                            <div className="absolute -inset-4  -z-10 blur-xl opacity-50 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Right: Toggle and Content */}
                    <div className="space-y-6">
                        {/* Service Toggle Buttons - One Line */}
                        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
                            {services.map((service, index) => (
                                <button
                                    key={service.id}
                                    onClick={() => setSelectedService(index)}
                                    className={`px-4 py-2 rounded-full font-semibold text-xs md:text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                                        selectedService === index
                                            ? 'bg-gradient-to-br from-[#1B3C53] via-[#3C5B6F] to-[#607274] text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>

                        {/* Selected Service Content */}
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                                {services[selectedService].icon}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                                    {services[selectedService].title}
                                </span>
                            </h3>
                            <div className="space-y-2">
                                {services[selectedService].description.map((line, index) => (
                                    <p
                                        key={index}
                                        className="text-sm md:text-base text-gray-700 leading-relaxed"
                                        style={{
                                            animation: `fadeInUp 0.5s ease-out forwards`,
                                            animationDelay: `${index * 0.1}s`,
                                            opacity: 0
                                        }}
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;

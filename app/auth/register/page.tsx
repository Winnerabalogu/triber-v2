"use client"

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const images = {
    business: '/auth/business.png?q=80&w=1932&auto=format&fit=crop',
    investor: '/auth/investor.png?q=80&w=1770&auto=format&fit=crop',
};

export default function RegisterPage() {
    const [activeTab, setActiveTab] = useState<'business' | 'investor'>('business');

    return (
        <AuthLayout imageSrc={images[activeTab]}>
            <RegisterForm onTabChange={setActiveTab} />
        </AuthLayout>
    );
}
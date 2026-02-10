"use client";
import React from 'react';
import PaperList from './PaperList';
import { CreditCard, Eye } from 'lucide-react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';

const AcceptedPapers = () => {

    const handlePay = async (paperId) => {
        try {
            const res = await axios.post(`${constant.SERVER_URL}papers?status=accepted`, {}, { withCredentials: true });

            if (res.data.success) {
                const { action, params } = res.data.payment;

                // Create form and submit to PayU
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = action;

                Object.keys(params).forEach(key => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = params[key];
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            } else {
                notify.error(res.data.message || "Payment initiation failed");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            notify.error(error.response?.data?.message || "Failed to initiate payment");
        }
    };

    

    return (
        <PaperList
            title="Accepted Papers"
            statusFilter="accepted"
        />
    );
};

export default AcceptedPapers;

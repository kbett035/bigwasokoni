import React, { useRef, useEffect, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/lib/supabase";

const Payments: React.FC = () => {
    const paystackWebViewRef = useRef<any>(null);
    const { user, userProfile } = useUserStore();
    const [billingEmail, setBillingEmail] = useState<string>('');
    const [billingMobile, setBillingMobile] = useState<string>('');
    const [paymentOption, setPaymentOption] = useState<'daily' | 'monthly'>('daily');
    const [days, setDays] = useState<number>(5);
    const [amount, setAmount] = useState<number>(100);
    const [subscriptionId, setSubscriptionId] = useState<string>(''); 

    useEffect(() => {
        if (user) {
            setBillingEmail(user?.email ?? ''); // Ensure non-null billing email
            setBillingMobile(userProfile?.phone_number ?? '');
            setSubscriptionId(paymentOption === 'daily' ? 'daily_package' : 'monthly_package');
        }
    }, [user, userProfile, paymentOption]);

    const handlePayment = async (response: any) => {
        if (!user) {
            Alert.alert("User not found", "Please sign in again.");
            return;
        }

        try {
            const { error: paymentError } = await supabase
                .from('payments')
                .insert([{
                    user_id: user.id,
                    subscription_id: subscriptionId,
                    amount,
                    payment_method: 'Paystack',
                    status: 'successful',
                }]);

            if (paymentError) {
                console.error('Error updating payments:', paymentError);
                Alert.alert("Payment Failed", "Could not save payment data.");
                return;
            }

            const { error: subscriptionError } = await supabase
                .from('subscriptions')
                .insert([{
                    user_id: user.id,
                    subscription_type: paymentOption,
                    start_date: new Date().toISOString(),
                    end_date: paymentOption === 'monthly'
                        ? new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
                        : new Date(new Date().setDate(new Date().getDate() + days)).toISOString(),
                    status: 'active',
                }]);

            if (subscriptionError) {
                console.error('Error updating subscriptions:', subscriptionError);
                Alert.alert("Payment Failed", "Could not save subscription data.");
                return;
            }

            Alert.alert("Payment Successful", "Thank you for your payment!");
        } catch (error) {
            console.error('Payment handling failed:', error);
            Alert.alert("Payment Failed", "Please try again later.");
        }
    };

    const handleSelectPaymentOption = (option: 'daily' | 'monthly') => {
        setPaymentOption(option);
        if (option === 'daily') {
            setAmount(days * 20);
        } else {
            setAmount(400);
        }
    };

    return (
        <View style={{ marginHorizontal: 15 }}>
            <View>
                <Text>Select Payment Option:</Text>
                <TouchableOpacity
                    onPress={() => handleSelectPaymentOption('daily')}
                    style={[styles.option, paymentOption === 'daily' && styles.selectedOption]}
                >
                    <Text style={styles.optionText}>Daily Package (20 KES/day, Min 5 days)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectPaymentOption('monthly')}
                    style={[styles.option, paymentOption === 'monthly' && styles.selectedOption]}
                >
                    <Text style={styles.optionText}>Monthly Package (400 KES)</Text>
                </TouchableOpacity>
            </View>
            <Paystack
                paystackKey="pk_test_4f6ffc3f55e513cdeb56e13dd9680afd61cb3702"
                billingEmail={billingEmail}
                amount={amount * 100}
                currency="USD"
                onCancel={(e) => {
                    console.log('Transaction Cancelled:', e);
                    Alert.alert("Transaction Cancelled");
                }}
                onSuccess={(res) => {
                    console.log('Transaction Successful:', res);
                    handlePayment(res);
                }}
                ref={paystackWebViewRef}
            />
            <TouchableOpacity
                onPress={() => paystackWebViewRef.current?.startTransaction()}
                style={styles.paystack}
            >
                <Text style={styles.pay}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    paystack: {
        minWidth: "60%",
        backgroundColor: "#F9A826",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    pay: {
        color: "white",
        fontWeight: "bold",
    },
    option: {
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#f0f0f0",
    },
    selectedOption: {
        backgroundColor: "#F9A826",
    },
    optionText: {
        textAlign: "center",
    },
});

export default Payments;

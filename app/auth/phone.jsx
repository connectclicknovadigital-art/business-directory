import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, signInWithPhoneNumber } from "../../config/firebase";

export default function PhoneLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    try {
      const phoneNumberFormatted = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;

      // This returns a ConfirmationResult object
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberFormatted, recaptchaVerifier.current);

      setConfirmationResult(confirmation);
      Alert.alert("OTP Sent!", "Check your SMS inbox.");
    } catch (error) {
      console.log("Error sending OTP:", error);
      Alert.alert("Error sending OTP", error.message);
    }
  };

  const confirmCode = async () => {
    try {
      if (!confirmationResult) return;

      // Use the confirm method of confirmationResult
      await confirmationResult.confirm(otp);

      Alert.alert("Login Success!");
    } catch (error) {
      Alert.alert("Invalid Code", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Text style={styles.title}>Phone Number Login</Text>

      {!confirmationResult ? (
        <>
          <TextInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <Button title="Send OTP" onPress={sendVerification} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Button title="Verify OTP" onPress={confirmCode} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
});

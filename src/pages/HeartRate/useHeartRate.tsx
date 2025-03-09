import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function useHeartRate() {
  const [loading, setLoading] = useState<boolean>(false);

  const sendHeartRateSample = async (heartRateList: number[]) => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${backendUrl}/api/heart-rate`;

    // prettier-ignore
    try {
      for (const heartRate of heartRateList) {
        const body = {
          rate: heartRate,
        };
  
        const token = localStorage.getItem("token");
  
        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });
  
        if (response.status === 200) {
          console.log("başarılı");
        }
  
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }
  
      toast.success('Tüm veriler gönderildi.');
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendHeartRateSample, loading };
}

export default useHeartRate;

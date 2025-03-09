import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import SimulatorType from "../types/SimulatorType";

function useRequestHandlerForSimulator() {
  const [loading, setLoading] = useState<boolean>(false);

  const sendSample = async (values: number[], simulator: SimulatorType) => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    let url: string;

    switch (simulator) {
      case SimulatorType.HeartRate:
        url = `${backendUrl}/api/heart-rate`;
        break;
      case SimulatorType.OxygenLevel:
        url = `${backendUrl}/api/oxygen-level`;
        break;
      default:
        toast.error("Geçersiz seçim");
        return;
    }

    // prettier-ignore
    try {
      for (const value of values) {
        const body = {
          value: value,
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

  return { sendSample, loading };
}

export default useRequestHandlerForSimulator;

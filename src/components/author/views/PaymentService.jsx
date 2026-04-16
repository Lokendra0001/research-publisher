"use client";
import React, { useState, useEffect } from "react";
import qrCode from "../../../../public/assets/qrCode/qrCode.png";
import {
  QrCode,
  ChevronRight,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Paperclip,
  ArrowLeft,
  Loader2,
  Info,
} from "lucide-react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentService = () => {
  const [step, setStep] = useState(1);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fee, setFee] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const paperId = searchParams.get("id");

  useEffect(() => {
    // Fetch Submission Fee
    const fetchFee = async () => {
      try {
        const res = await axios.get(`${constant.SERVER_URL}public/submission-fee`);
        if (res.data.success && res.data.fee) {
          setFee(res.data.fee.submissionFee);
        }
      } catch (err) {
        console.error("Error fetching fee:", err);
      }
    };
    fetchFee();
  }, []);

  useEffect(() => {
    if (!paperId) {
      setLoading(false);
      return;
    }

    const fetchPaper = async () => {
      try {
        const res = await axios.get(`${constant.SERVER_URL}papers/${paperId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setPaper(res.data.data);
        }
      } catch (err) {
        console.error(err);
        notify.error("Failed to fetch paper details");
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notify.error("File size should be less than 5MB");
        return;
      }
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paperId) {
      notify.error("Missing paper ID");
      return;
    }
    if (!screenshot) {
      notify.error("Please upload a payment screenshot");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("paperId", paperId);
      formData.append("transactionId", transactionId);
      formData.append("screenshot", screenshot);

      const res = await axios.post(
        `${constant.SERVER_URL}payment/manual`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        notify.success("Payment details submitted successfully!");
        setTimeout(() => {
          router.push("/author/role?page=submitted_papers");
        }, 2000);
      } else {
        notify.error(res.data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      notify.error(
        err.response?.data?.message || "An error occurred during submission",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-secondary animate-spin" />
        <p className="mt-4 text-muted-foreground animate-pulse font-medium">
          Preparing payment secure session...
        </p>
      </div>
    );
  }

  if (!paperId || !paper) {
    return (
      <div className="max-w-md mx-auto p-10 text-center bg-white rounded-3xl shadow-2xl border border-border mt-20">
        <AlertCircle className="w-16 h-16 text-danger mx-auto mb-6 opacity-80" />
        <h2 className="text-2xl font-bold mb-3 text-foreground">
          Submission Not Found
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          We couldn't verify the paper associated with this checkout.
        </p>
        <button
          onClick={() => router.push("/author/role?page=new_submission")}
          className="bg-secondary text-white w-full py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 transition-transform active:scale-95"
        >
          Check My Papers
        </button>
      </div>
    );
  }

  return (
    <div className=" max-w-5xl mx-auto p-4 md:p-12 ">
      {/* Header section with status steps */}
      <div className="mb-12 max-w-sm mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="flex flex-col items-center z-10 transition-all duration-300">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${step >= 1 ? "bg-secondary text-white shadow-xl shadow-secondary/30 scale-110 rotate-3" : "bg-muted text-muted-foreground"}`}
            >
              <QrCode className="w-6 h-6" />
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest mt-3 font-black ${step >= 1 ? "text-secondary" : "text-muted-foreground"}`}
            >
              Scan
            </span>
          </div>

          <div
            className={`flex-1 h-1 mx-4 -mt-10 rounded-full transition-all duration-700 ease-in-out ${step >= 2 ? "bg-secondary" : "bg-muted"}`}
          ></div>

          <div className="flex flex-col items-center z-10 transition-all duration-300">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${step >= 2 ? "bg-secondary text-white shadow-xl shadow-secondary/30 scale-110 rotate-3" : "bg-muted text-muted-foreground"}`}
            >
              <Upload className="w-6 h-6" />
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest mt-3 font-black ${step >= 2 ? "text-secondary" : "text-muted-foreground"}`}
            >
              Verify
            </span>
          </div>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-[20px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
        {step === 1 ? (
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Left side: Instructions */}
            <div className="p-10 lg:w-1/2 flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
                  Manual Checkout
                </span>
                <h1 className="text-4xl font-black text-foreground tracking-tighter leading-none mb-6">
                  Complete Your <br />
                  <span className="text-secondary">Submission</span>
                </h1>
                <p className="text-muted-foreground text-lg italic">
                  " {paper?.title} "
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-muted/5 rounded-3xl border border-border/30">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      1
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Scan the QR code to continue
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      2
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Take a screenshot of the payment success
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary font-black text-white rounded-[5px] shadow-lg shadow-secondary/10">
                  <span className="text-xs uppercase opacity-80">Paper ID</span>
                  <span className="text-sm tracking-tight">
                    {paperId.slice(0, 8)}...
                  </span>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="cursor-pointer w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-[5px] flex items-center justify-center group transition-all transform active:scale-[0.98] shadow-2xl shadow-secondary/20 border-b-4 border-black/10 "
                >
                  Upload Proof
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side: Large QR Code */}
            <div className="p-10 lg:w-1/2 flex flex-col items-center justify-center bg-muted/5 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                <QrCode className="w-[120%] h-[120%] rotate-12" />
              </div>

              {/* Amount Display Label */}
              <div className="mb-6 text-center">
                <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1 opacity-70">
                  Fixed Processing Fee
                </p>
                <h2 className="text-4xl font-black text-foreground tabular-nums">
                  ₹{fee || "..."}
                </h2>
              </div>

              <div className="relative group">
                <div className="bg-white p-4 rounded-[20px] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] border-2 border-secondary/5 transition-all select-none pointer-events-none duration-500">
                  <img
                    src={qrCode.src || qrCode}
                    alt="Payment QR Code"
                    className="w-72 h-72 md:w-80 md:h-80 object-contain rounded-[10px] p-2"
                  />
                  <div className="absolute inset-0 rounded-[20px] shadow-inner pointer-events-none"></div>
                </div>

                {/* Visual corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-[6px] border-l-[6px] border-secondary -mt-1 -ml-1 rounded-tl-3xl opacity-40"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[6px] border-r-[6px] border-secondary -mb-1 -mr-1 rounded-br-3xl opacity-40"></div>
              </div>

              <div className="mt-8 flex flex-col items-center space-y-4 max-w-xs mx-auto">
                {/* Warning Label */}
                <div className="flex items-start space-x-3 p-3 bg-danger/5 rounded-xl border border-danger/20">
                   <AlertCircle className="w-4 h-4 text-danger mt-0.5 shrink-0" />
                   <p className="text-[10px] font-semibold text-danger leading-relaxed">
                      <span className="font-bold uppercase tracking-tight">Warning:</span> Please pay the full amount of ₹{fee}. Partial payments or incorrect amounts will result in submission rejection.
                   </p>
                </div>

                {/* Publication Mention Label */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20">
                   <CheckCircle className="w-3 h-3 text-secondary shrink-0" />
                   <p className="text-[9px] font-bold text-secondary uppercase tracking-tighter">
                      Verified papers are published automatically.
                   </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              <div className="p-10 border-r border-border/30 flex flex-col justify-center bg-muted/5">
                <div className="w-full space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-black text-foreground tracking-tighter">
                      Submit <br />
                      <span className="text-secondary">Proof</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-border shadow-sm text-secondary hover:bg-secondary hover:text-white transition-all transform active:scale-90"
                      title="Back to QR"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-secondary tracking-widest ml-1">
                        Ref No. / UTR (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 12-digit UTR No."
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full h-14 rounded-2xl border-2 border-border/50 px-6 text-sm font-bold focus:border-secondary focus:ring-0 outline-none bg-white transition-all shadow-sm focus:shadow-secondary/5"
                      />
                    </div>

                    <div
                      className={`relative border-2 border-dashed rounded-[32px] p-10 transition-all flex flex-col items-center justify-center group
                        ${screenshot ? "border-success/40 bg-success/5 shadow-inner" : "border-border/60 hover:border-secondary/40 hover:bg-white cursor-pointer"}`}
                      onClick={() =>
                        document.getElementById("screenshot-upload").click()
                      }
                    >
                      <input
                        id="screenshot-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {preview ? (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                              <Upload className="text-white w-8 h-8" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1">
                            <Upload className="text-secondary w-8 h-8" />
                          </div>
                          <p className="font-bold text-foreground text-center">
                            Click or Drag Screenshot
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter font-medium">
                            JPEG, PNG under 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 flex flex-col justify-center bg-white shadow-inner">
                <div className="bg-muted/10 rounded-[32px] p-8 border border-border/30 mb-8 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full pointer-events-none"></div>

                  <h3 className="font-black text-foreground text-sm uppercase tracking-widest mb-6 flex items-center opacity-40">
                    Verification Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Original Title
                      </span>
                      <span className="font-bold text-foreground text-sm truncate">
                        {paper?.title}
                      </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-border/40 pb-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">
                          Gateway
                        </span>
                        <span className="font-bold text-foreground text-sm flex items-center">
                          <CheckCircle className="w-3 h-3 text-success mr-1" />{" "}
                          Manual QR
                        </span>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">
                          Status
                        </span>
                        <span className="bg-warning/20 text-warning px-3 py-1 rounded-full text-[10px] font-black italic">
                          PENDING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !screenshot}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-black py-4 rounded-[5px] flex items-center justify-center transition-all transform active:scale-[0.98] shadow-2xl shadow-secondary/30 disabled:opacity-40 disabled:grayscale"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      VERIFY & SUBMIT PROOF
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
                <div className="mt-6 flex items-center justify-center space-x-2 text-muted-foreground opacity-60">
                  <Info className="w-3 h-3" />
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-center">
                    Your submission metadata will be validated against txn logs
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentService;
